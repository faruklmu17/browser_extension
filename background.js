chrome.runtime.onInstalled.addListener(function () {
    // Initialize storage with default values if not set
    chrome.storage.local.get(['testsRun', 'testsPassed', 'testsFailed'], function (result) {
      if (result.testsRun === undefined) {
        chrome.storage.local.set({
          testsRun: 0,
          testsPassed: 0,
          testsFailed: 0
        });
      }
    });
  });
  // this version is working as expected