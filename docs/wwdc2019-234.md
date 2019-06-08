-   Framework: Vision
-   VNRecognizeTextRequest, does the heavy lifting for you!
-   Sample code attached to session
-   Two paths: fast (uses character recognition), accurate (uses NN to
    recognize sentences)
-   Fast: processing time, memory footprint
-   Accurate: support for rotated, variety of fonts
-   VMImageRequestHandler =\> VNRecognizeTextRequest =\> callback
    VNRecognizedTextObservation
-   VMRecognizeTextRequestRevision1 to pin down to the specific version
    that you have optimized for
-   Allows finding substrings in candidate results, which will return
    the correct boundingbox!!!
-   VisionKit, VNDocumentCameraViewController
-   Language knowledge, performance, processing results
-   Custom Lexicon support for domain specific language:
    `VNRecognizeTextRequest.customWords = \["1337", "q42"\]`
-   `usesCPUOnly` allows for running specifically on CPU if GPU is in
    use by game/AR/etc.
-   Demo app "My First Image Reader" contains Continuity Camera support
-   Don't take the main result for granted: the topCandidates are also
    available. Use those for indexing too to increase recall!
-   NSDataDetector, for types of interest (built in: Addresses, URLs,
    dates & phone numbers, custom: Lexicon, RegExp)
-   [developer.apple.com/wwdc19/234](https://www.google.com/url?q=http://developer.apple.com/wwdc19/234&sa=D&ust=1559981348864000)
