# Generic Salesforce LWC – Custom Lookup

A reusable Lightning Web Component (LWC) that implements a generic, configurable lookup experience, similar to Salesforce standard lookups, but fully customizable and extensible.

This project was designed with enterprise Salesforce architecture principles in mind and can be easily reused across multiple objects, pages, and use cases.

Goal: Provide a clean, modern, and scalable Custom Lookup solution that demonstrates strong Salesforce LWC + Apex integration skills.

## Features

✅ Generic lookup for any sObject

✅ Dynamic SOQL with backend filtering (Apex)

✅ Debounced search (performance-friendly)

✅ Default record pre-selection (edit scenarios)

✅ Optional secondary metadata line ("meta")

✅ SLDS-compliant UI (Salesforce Look & Feel)

✅ Parent ↔ Child communication via Custom Events

✅ Ready for Record Pages, App Pages, and custom flows

# Architecture Overview
```
Parent LWC
   ↓ (default-record-id)
Custom Lookup (LWC)
   ↓ (Apex calls)
CustomLookupController (Apex)
   ↑ (results)
Custom Lookup (LWC)
   ↑ (CustomEvent: lookupupdate)
Parent LWC
```
This separation ensures:

Clear responsibilities

Loose coupling

Easy maintenance and extensibility
```
Project Structure
lwc/
 ├── customLookup/
 │   ├── customLookup.html
 │   ├── customLookup.js
 │   └── customLookup.js-meta.xml
 │
 └── parentComponent/
     ├── parentComponent.html
     ├── parentComponent.js
     └── parentComponent.js-meta.xml
classes/
 └── CustomLookupController.cls
 ```
# Deployment

Use a package.xml or SFDX deploy:
```
sf project deploy start --manifest package.xml
```
Ensure the following metadata is included:

LightningComponentBundle

ApexClass

# Project Demonstrations

This repository demonstrates:

Strong understanding of Salesforce LWC fundamentals

Clean parent/child communication patterns

Scalable enterprise-ready architecture

Performance-aware frontend development

Clear separation of concerns (UI vs Business Logic)

Ideal for Salesforce Developer, Integration Specialist, or Technical Consultant roles.
