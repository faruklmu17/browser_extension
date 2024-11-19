document.addEventListener('DOMContentLoaded', function () {
    // Load results when the popup opens
    loadTestResults();
  
    // Attach the file input listener each time the popup is loaded
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileUpload);
  });
  
  function handleFileUpload(event) {
    const file = event.target.files[0];
  
    if (file) {
      console.log('File selected:', file.name);
      const reader = new FileReader();
  
      reader.onload = function (readerEvent) {
        const fileContent = readerEvent.target.result;
        console.log('File content:', fileContent);
        parseTextTestResults(fileContent);
      };
  
      reader.readAsText(file);
    }
  }
  
  function parseTextTestResults(content) {
    console.log('Parsing content:', content);
  
    const testsRunMatch = content.match(/Total Tests: (\d+)/);
    const testsPassedMatch = content.match(/Passed: (\d+)/);
    const testsFailedMatch = content.match(/Failed: (\d+)/);
  
    let testsRun = testsRunMatch ? parseInt(testsRunMatch[1]) : 0;
    let testsPassed = testsPassedMatch ? parseInt(testsPassedMatch[1]) : 0;
    let testsFailed = testsFailedMatch ? parseInt(testsFailedMatch[1]) : 0;
  
    console.log('Parsed Results:');
    console.log('Tests Run:', testsRun);
    console.log('Tests Passed:', testsPassed);
    console.log('Tests Failed:', testsFailed);
  
    // Store results in chrome.storage
    chrome.storage.local.set({
      testsRun: testsRun,
      testsPassed: testsPassed,
      testsFailed: testsFailed
    }, function () {
      // Reload the results after storing
      loadTestResults();
    });
  }
  
  function loadTestResults() {
    // Retrieve the stored results from chrome.storage
    chrome.storage.local.get(['testsRun', 'testsPassed', 'testsFailed'], function (result) {
      const testsRun = result.testsRun || 0;
      const testsPassed = result.testsPassed || 0;
      const testsFailed = result.testsFailed || 0;
  
      // Update the popup with the stored values (or default to 0 if no values are stored)
      document.getElementById('tests-run').textContent = testsRun;
      document.getElementById('tests-passed').textContent = testsPassed;
      document.getElementById('tests-failed').textContent = testsFailed;
    });
  }
  