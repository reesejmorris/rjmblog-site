---
slug: "function-upgrade"
date: "2024-10-21"
title: "Upgrading your .NET 6 in-process Azure function to .NET 8"
---

With the .NET 6 end of life looming you might be in the process of upgrading your services to .NET 8 before the deadline (12th November 2024). Now, some of these services might include some in-process Azure functions. Although Microsoft recommends that you should consider upgrading to an isolated worker model for Azure functions, as the in-process model will be deprecated in future (10th November 2026), sometimes you don't have the capacity to change the model. I'm not going to go into the benefits of the isolated model, but I will post a link to a comparison page at the bottom.

Now for the upgrade. For the first part, you want to update each of the `TargetFramework` properties in your csproj files to `net8.0` and upgrade any relevant packages:

```xml
<TargetFramework>net8.0</TargetFramework>
```

This step will be familiar with a lot of developers as there is a steady stream of .NET releases.

If you tried deploying the function after this update, you'll notice this error:

`Microsoft.Azure.WebJobs.Script: Error building configuration in an external startup class. MyFunctionName: Could not load file or assembly 'Microsoft.Extensions.Configuration.Abstractions, Version=8.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60'. The system cannot find the file specified.`

This is because there is a new setting that is required for in-process functions running on .NET 8 which is `FUNCTIONS_INPROC_NET8_ENABLED` with a value of `1`. You can add this manually to the app configuration in the portal or to your provisioning code. Once the app has refreshed, you will notice your function executing without fault.

More reading on this topic:

- [Isolated vs in-process](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-in-process-differences)
- [github in-process for .NET 8 issue](https://github.com/Azure/azure-functions-host/issues/9951)