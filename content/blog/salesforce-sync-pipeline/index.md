---
title: "Building a Salesforce Sync pipe with Node.js"
date: "2021-12-07T19:01:06.173Z"
layout: post
draft: false
path: "/salesforce-sync-pipeline/"
description: "Architecture notes"
tags:
  - "Architecture"
---

## Overview

A typical SaaS organization may have an application they would like to use to populate data in their customers' Salesforce instances.

Maybe you have some customer data that you'd like to sync with Salesforce. Maybe you are a data provider that wants to push enrichment data. Whatever application you make, if your customers use Salesforce, chances are they'd like to use your data in their Salesforce.

### Considerations

We want to be mindful of Salesforce limits; there are many that affect our design. Whenever possible, it is best to "bulk-ify" operations, meaning we want to work efficiently with large amounts of information, while being sure we don't overload the Salesforce servers. We do this by limiting queries for information to 200 or less (100 seems optimal) records at a time and using the "Bulk API" for any record updates.

### Features

#### Live sync

A "Live" sync is performed whenever a record is created or changed. When a record is created, if it meets the criteria, a sync request is generated. It is easiest to do this utilizing Salesforce Platform Events, which work like a queue. We will use the officially supported CometD JavaScript libraries to consume the queue and listen for new events. It is best to avoid other implementations of CometD as they tend to not be as reliable.

#### Refresh Sync

A "Refresh" sync is performed on a periodic, scheduled basis. The service queries Salesforce for all related objects (often Accounts or Leads) and emits a sync request for those objects in batches of 100. Refresh syncs should be scheduled to run during off hours, typically on the weekends when your customers usage of Salesforce is limited, and your limits are most relaxed. This will keep your process running as efficiently as possible, while limiting the effects on your customers.

### Architecture Components

#### Salesforce (Managed) Package Components

A [Salesforce Packaging Org](https://trailhead.salesforce.com/en/content/learn/modules/cumulusci-for-managed-packages/create-a-packaging-org) will be used to create and maintain the managed package that will encapsulate all of the Salesforce "components" used during the sync process.

- Custom Objects: Used as your data repository. You can think of this as a table or sheet in a spreadsheet. These objects hold all the Fields and their definitions. Any record is like a row in that table. The field definitions define what kind of field makes up the column, i.e. text, number, date and their properties: length, scale, precision...
- Platform Event: This is what represents a sync request. It is a record (similar to a Custom Object record) that is generated as part of the sync request. This is the record that will go into the queue. The Platform Event also has Fields, but each record exists as part of a stream, having each record associated to a sequential-ish "Replay ID" number. Platform Events are the core piece of the Live sync process. Using this provides for the utmost customization since they can be emitted in a variety of ways, with even the simplest point-and-click tools available in Salesforce.
- Flow(s): We need something to emit the Platform Event. This is that something. Flows can be created in a variety of ways, such as Process Builder, Process Automation, or workflow rules. This component will be the thing that emits the Platform Event. An alternative to building a flow is writing custom Apex or Triggers. Regardless of how the Platform Event is emitted, something needs to exist to emit the Event. We find it easiest to use simple point-and-click tools that already exist in Salesforce, such as Process Builder Flows.
- Permission Set: A Salesforce Permission Set is recommended to provide access to the Custom Objects that are part of your package. By default, any record in Salesforce is not visible nor readable by anyone, except for Admins. In order for your sync to work, the customer's user needs access to those fields. A Permission Set that provides access to every Field in your package is the recommended way to do this. If trouble arises, first make sure the user has the appropriate permission set.
- Page Layout: A page layout for your Custom Objects is a nice way to surface your data to your customers, with a specific arrangement for how your fields will be layed out. If you don't have a page layout available, your customers will have to make one of their own just so they can see the data.

#### Backend Sync Components

Node.js is used as the technology to perform the sync process. Node is the best choice because of the availability of supported libraries, such as CometD and JSforce, along with good support for databases (Redis is a good choice), and other platforms.

##### Platform Event listener using CometD

In order to consume the Platform Events, we use CometD. CometD uses "long-polling" as it's real-time communication technology. Websockets is a newer tech, and is similar, but is not used. CometD and Websockets have similarities, but the technique used is different. CometD holds a connection open, delaying the response to a request until a record is available. This is a relatively fragile and chatty technique, but is nonetheless effective at establishing persistent streaming connections.

Something to note with CometD and Platform events is that every connection is a one-to-one connection, meaning that a connection between the service and each customer org will need to be established, maintained, and monitored.

##### Ingress Queue

The Ingress (Ingest) queue is used by both the Live and Refresh sync processes. Any request is placed on this queue. A request can be for as few as 1 record up to 100 records. An Ingestion service monitors this queue. When a new event is received, the process looks up data in your API, requests possible matches of your Custom Object in the customer org, compares the data to see if you have any new data, and finally emits an event onto the Egress (Egestion) queue.

##### Egress Queue

This queue represents a request to insert/update data in your customer's org. Each record in this queue should result in data transmitted to Salesforce.

Any request of less than 10 records is done using the Salesforce REST API. This typically happens during the Live sync, meaning we want updates to happen as quickly as possible. The REST API is the quickest way to update records. However, it can only update one record at a time, and this, is ineffective for large syncs. You may run through a customers limits and lock up their org, which would be very bad.

Any request that is larger than 10 records is done using the Bulk API. This process consists of multiple api requests to setup, execute, and poll for the result. This takes about 10x as long as the REST API, so is not optimal for the Live sync, but is optimal for Refresh syncs.

### Other Considerations

Proper modern Salesforce development is done using the SFDX CLI, Developer Hub orgs, and Scratch orgs. This code-based version-control friendly development process supports teams of any size. It is usually best to make changes to your package components in a Scratch org, then push your updated code to your packaging org, ideally as part of a CI/CD process. Once the code is in the packaging org, a new package can be "Uploaded" and it's corresponding link published to customers for installation.
