Terugkijken:
============

-   SwiftUI on all devices
-   Developing a Great Profiling Experience
-   Adding Indoor Maps to your App and Website

Uitzoeken:

-   CallKit Identity Lookup, vet voor Q42 als collega belt zonder dat je
    \'t nummer hebt?

Day 2, session 1, Accessibility
===============================

-   "Button" is spoken after accessibilityLabel
-   Cookie Monster emoji app voorbeeld: "Me happy face eat small cookie,
    om nom nom"
-   Accessibility Custom Actions
-   Needed for 1) Reducing clutter 2) Convenience & speed
-   Disable repeated buttons in a table view & replace with actions
-   Speaks "actions available", swipe up to read the actions
-   Primephonic: "play" / "add to playlist" / etc
-   "control.isAccessibilityElement = false"
-   "control.accessibilityCustomActions"
-   Improvements
-   Accessibility "Environment overrides" panel to quickly switch
    simulator to accessibility settings
-   UIAccessibility.isReduceMotionEnabled: Bool
-   Color-Blindness, "Differentiate without Colour" so you can switch
    from using colours to switching to icons.
-   Accessibility Inspector
-   Xcode \> Open Developer Tool \> Accessibility Inspector
-   Options: Audit, Inspect, Environment Settings
-   No need to globally enable Voice-Over in Simulator: Voice-Over
    controls are available in the tool.
-   Color Contrast calculator
-   Windows \> Show Color Contrast Calculator

More:

-   [https://npr.codes/custom-accessibility-actions-for-ios-3e35409c9dcc](https://www.google.com/url?q=https://npr.codes/custom-accessibility-actions-for-ios-3e35409c9dcc&sa=D&ust=1559981348835000)
-   Accessibility Inspector existed before and was already used for Mac
    apps

Day 2, session 2, What\'s new in Swift
======================================

Ted Kremenek, Anna Zaks

-   swiftmodule =\> swiftinterface
-   Shared runtime for compatible OS'ses. App Store thins the runtime
    copy away if the bundle is build for older OS'ses too.
-   10% smaller code size with Swift 5.1 due to optimizations
-   15x faster String -\> NSString bridging between Objective-C/Swift
    due to using UTF-8 instead of UTF-16
-   Dockerized Swift available on DockerHub
-   soucekitd stress tests
-   LSP: apple/sourcekit-lsp for source code completions in
    vim/vscode/etc.
-   String interpolation with "LocalizedStringKey": translation AFTER
    the translation is done. SE-0228
-   Opaque Result Types: "some Shape"

<!-- -->

-   Mitigates 4 downsides of returning the root Protocol type
-   Equality checks
-   Compiler optimizations, etc.

<!-- -->

-   \@propertyWrapper to declare & access
-   Embedded DSLs: this drives HTML DSL & SwiftUI framework

<!-- -->

-   https://forums.swift.org/t/pitch-function-builders/25167

Day 2, session 3, Desktop Class browsing on iPad
================================================

-   Regular shotcuts in Safari
-   iPad presents itself as a Mac instead of an iOS device!
-   Pointer events
-   WebViews in Apps

<!-- -->

-   Link following
-   Web browser
-   Hybrid app
-   Authentication

<!-- -->

-   SFViewController gets MacOS instead of iOS agent / class
-   Automatically specifies correct browsing mode (split screen/iPad
    mini)
-   webkit.applicationNameForUserAgent : fills in the rest auto
-   WKWebPagePreferences.ContentMode { desktop, mobile, auto }
-   decidePolicyFor navigation

------------------

-   For app developers
-   webView.customUserAgent =\> WKWebViewConfiguration with
    applicationNameForUserAgent
-   Delegate didCommit navigation: WKNavigaton.effectiveContentMode can
    be used to read the actually used ContentMode

---------------

-   For web developers, by Beth Dakin
-   window.PointerEvent feature detection
-   Event type: "pointermove" (or else "mousemove")
-   PointerEvent.eventType = \[ pen, mouse, touch \]
-   CSS "touch-action: none;" to click instead of touch-scroll
-   On hover, if a meaning full HTML/style change happens, the click is
    not performed: a heuristic to support hover
-   Hardware Accelerated Scrolling for iframes/subframes!!!
-   \`-webkit-overflow-scrolling: touch;\` & TouchEvents are not
    required anymore.
-   \`-webkit-overflow-scrolling: touch;\` is now a noop on iPad.
-   "viewport" misuse, so now iPadOS will ignore viewport if the HTML is
    wider than the device-width. Will shrink view & upscale the text.
-   So implement responsive design correctly, or you will be shrunk
-   window.visualViewport, addEventListener("visualViewportChange") to
    detect Keyboard overlapping the content
-   matchMedia("(hover: hover)") om in JavaScript media queries te
    runnen (is al oud?)

Day 2, session 4, iPad apps for Mac
===================================

Ali ozer, Jake petroules, Jason beaver

-   xcframework for multi-platform bundles & works for Objective-C too

Day 2, session 6, Reality Kit
=============================

-   Build on top of Mesh Networking for shared world model
-   ARView, Achor, Scene & Entity
-   Control the Depth of Field on basic of the iPhone Camera
-   Filmgrain: addable for more realistic blend

Day 3, session 3, SwiftUI Essentials
====================================

-   Views are nice, but how do you: cloud sync, drag & drop
-   Bindings, \@State attribute, "Data Flow through Swift UI", Thursday
    9:00
-   Forms, like VStack but for heterogeneous views
-   VStack =\> Form, is a drop-in replacement
-   Section { ... } for grouping
-   Parent view customizes subview properties

SwiftUI Labs
============

-   UITableView like performance will come in future releases, the
    current List is less performant.
-   Data Bindings how-to
    (https://gist.github.com/hermanbanken/ea65fedf16ad8eac75c3dacfe6de4663)
-   [https://twitter.com/hermanbanken/status/1136371582656425986](https://www.google.com/url?q=https://twitter.com/hermanbanken/status/1136371582656425986&sa=D&ust=1559981348845000)
-   UITableView prefetching using .OnAppear and .OnDisappear

Day 3, session 2, Understanding Images in Visual Framework
==========================================================

-   More face-landmarks
-   Demo with SimilarityGame: draw image & let others replicate it,
    winner is closed match

Day 3, session 4, Apple Watch SwiftUI
=====================================

-   WKHostingController\<ViewType\>
-   Rich notifications are made of Short View (Logo & App naam) and Long
    View: detail
-   Long View is the main interface of your app on the watch
-   Pinnen of View Previews in XCode, so you can view 2 views at the
    same time while editing (view the parent view while updating the
    child)
-   List, Picker, ScrollView all give Crown integratie & Haptic feedback
-   Modifier \`.digitalCrownRotation(binding: destinationProp, from:
    1.0, through: 15.0, by: 2.0)\`
-   And also: \`.digitalCrownRotation(binding: destinationProp, from:
    1.0, through: 15.0, by: 2.0, sensitivity: .low, isContinuous:
    true)\`
-   Modifier \`.focusable(true)\`
-   ZStack, next to V-/HStack
-   See other talk "SwiftUI on all devices", Friday
-   Code available with WWDC Video

Day 3, session 5, Swift Package Manager
=======================================

-   Using package
-   What is a package
-   Package resolution
-   Updating package

Day 3, session 7, Designing Audio-Haptic Experiences
====================================================

-   Hugo Verweij & Camille ...
-   Haptics zijn low frequency sounds
-   Haptic sharpness is de vorm van de buik van de 'golf'
-   Causality, Harmony, Utility

Day 4, session 1, Data Flows through SwiftUI
============================================

-   Luca Benardi, Raj Ramamurthy
-   Principles of Data Flow
-   Anatomy of an Update
-   Understanding Your Data

-   Property, BindableObject, \@Environment, \@Binding, \@State
-   "\@State is the source of truth"
-   "Views are a function of state, not of a sequence of events"
-   \$-prefix derives a \@Binding from a \@State
-   withAnimation wraps action that triggers recompute
-   Must publish on main thread, use \`.receive(on:)\`
-   BindableObject for external data, is a reference type, for existing
    models

<!-- -->

-   Protocol has \`didChange\` property which must be a
    Publisher/Subject
-   Call .send on subject when updating the data

<!-- -->

-   \@ObjectBinding var model: \<BindableObject conform\>
-   \@EnvironmentObject var model: \<BindableObject conform\>
-   Environment is indirectly passed through the view hierarchy

<!-- -->

-   Used by accent color, text direction, dynamic type, Dark Mode &
    Forms

<!-- -->

-   Example when to use \@State: Button tracking the highlight state

onReceive(\<publisher\>) { newCurrentTime in

  self.currentTime = newCurrentTime

}

Other talks:

-   Combine
-   Building Custom Views with SwiftUI

Day 4, session 2, Introducing Combine & Advances in Foundation
==============================================================

I-Ting Tina Liu

-   Ordered Collection Diffing: \`Sequence.difference(from:)\` generates
    diff, \`Sequence.applying(diff:)\` performs patch
-   ContiguousBytes protocol, means data is available as contiguous
    bytes in memory
-   Data.compressed(using:), with 4 algorithms
-   RelativeDateTimeFormatter (2 weeks ago)
-   ListFormatter.localizedString(byJoining:)
-   OperationQueue, barriers & progress counting

Tony Parker, Combine

-   A unified, declaraive API for processing values over time
-   Request driven, vs Event driven
-   Publishers/Subscribers/Operators
-   Publishers are value type
-   extension: NotificationCenter.Publisher(center: NotificationCenter,
    name: Notification.Name, object: Any? = nil)
-   Subscribers.Assign
-   .receive(subscription:), .request(demand:), .receive(value:)
-   Operators are also value types
-   Example operator: Publishers.Map
-   Declarative Operator API: functional, lists, error, threads, time

Day 4, session 3, Advances in Networking part 1
===============================================

-   Low Data Mode
-   Combine in URLSession
-   WebSocket
-   Mobility Improvements

Low Power Mode:

-   Per wifi/cellular network configurable
-   System policy:

<!-- -->

-   Discretionary tasks deferred
-   Background App Refresh disabled

<!-- -->

-   Application

<!-- -->

-   Reducing image quality
-   Less pre-fetching
-   Synchronize less often
-   Mark tasks "discretionary"
-   Disable auto-play
-   You should not block user-initiated work

Combine in URLSession

-   DataTaskPublisher, similar to URLSession.dataTask()
-   Compassable operators, just like you expect, like Rx

WebSocket support in URLSession & Networking.framework

-   URLSession.shared.webSocketTask(with: URL).resume()
-   Stats are calculated including roundtrip time

Mobility

-   WiFi-assist greatly improved
-   Multipath-TCP now used in Maps & Music
-   See[ https://multipath-tcp.org](https://www.google.com/url?q=https://multipath-tcp.org&sa=D&ust=1559981348860000)

Day 4, session 4, Combine in Practice
=====================================

Michael LeHew, Ben D. Jones

Sprak enorm voor zich. Standaard voorbeeld van RxSwift met zoekbalk.
Gekozen oplossing had debounce, districtUntilChanged alternatief, etc.

Day 4, session 5, Natural Language processing
=============================================

-   NLGazetteer/MLGazetteer: bloom filter, results in Text Catalog
-   Word Embeddings: vector representation of words
-   Neural Networks in NLP framework

Day 4, session 7, Text Recognition in the Vision Framework
==========================================================

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
    \`VNRecognizeTextRequest.customWords = \["1337", "q42"\]\`
-   \`usesCPUOnly\` allows for running specifically on CPU if GPU is in
    use by game/AR/etc.
-   Demo app "My First Image Reader" contains Continuity Camera support
-   Don't take the main result for granted: the topCandidates are also
    available. Use those for indexing too to increase recall!
-   NSDataDetector, for types of interest (built in: Addresses, URLs,
    dates & phone numbers, custom: Lexicon, RegExp)
-   [developer.apple.com/wwdc19/234](https://www.google.com/url?q=http://developer.apple.com/wwdc19/234&sa=D&ust=1559981348864000)

Day 4, session 8, Advance in Networking part 2
==============================================

-   Bonjour

<!-- -->

-   Wide-Area Service Discovery: discover printers in different network,
    via "Discovery Proxy" \@tomas
    ([https://github.com/IETF-Hackathon/mDNSResponder](https://www.google.com/url?q=https://github.com/IETF-Hackathon/mDNSResponder&sa=D&ust=1559981348864000))
-   NWBrowser is a new Bonjour service discovery helper
-   TLS with symmetric keys using a passphrase & CryptoKit demo'd in the
    TicTacToe application

<!-- -->

-   Building Framing Protocols

<!-- -->

-   You can now write Framing logic that runs in the Networking User
    Thread
-   Implement NWProtocolFramerImplementation, handleInput, handleOutput
-   Add custom protocol to parameters.applicationProtocols

<!-- -->

-   Collecting Metrics

<!-- -->

-   URLSession Task Metrics is improved
-   Available in didFinishCollectingMetrics call of URLSession
-   Network.framework Metrics now allows inspecting metrics of
    individual network calls
-   'Optimistic DNS' optimistically connects to last known server of
    DNS. In parallel performs a DNS lookup & disconnects initial
-   Devices&Simulators now has Device Conditions (for example Network
    Link which can be set to 3G, WiFi or High Latency DNS)

<!-- -->

-   Best Practices and Status Updates (by Stuart Cheshire)

<!-- -->

-   Catalyst apps have by default only access for Outgoing applications
-   TLS 1.3 is now supported. Much faster (1 roundtrip instead of 2) and
    more secure (AEDE & Forward Secrecy)
-   Access to network information is now restricted to select apps,
    current VPN apps & NEHotspotConfiguration apps
-   Use the Network Link Conditioner in Xcode tool Devices&Simulators
-   allowsExpensiveNetworkAccess, waitsForConnectivity = true
-   file:// and ftp:// are no longer available
-   SPDY is replaced by HTTP/2
-   '\_tcp.\_tictactoe' Bonjour service is actually registered with IANA
    🤣
-   Apple team won the ACM award for great networking achievements for
    multi-path TCP today

Day 5, session 1, Building Custom Views in SwiftUI
==================================================

Dave Abraham

Layout System

-   "Layout is about determining the bounds of what you see on the
    screen"
-   Root View -\> Content View -\> Text, root view is already minus the
    safe area insets
-   Modifier: '.edgesIgnoreingSafeArea(true)'
-   Parent proposes size for a child, but child chooses its own size
-   Modifiers: .aspectRatio(1), .frame(width: height:)
-   SwiftUI rounds to nearest pixel
-   .padding() uses adaptive padding, automatically resizes padding
    depending on environment
-   By default, Image's are fixed size
-   Adaptive Spacing & Edge to Edge spacing adheres to Human Interface
    Design Guidelines
-   How Stacks work: walkthrough about how the child sizes are
    calculated
-   \`.layoutPriority(1)\`, default priority is 0. Children are examined
    in layout priority order.
-   Alignments include \`.lastTextBaseline\` which align all text
    baselines to the bottom (ict .bottom)
-   aligmentGuide(\<.alignment\>) { d in d\[.bottom\] \* 0.98 }
-   Custom 'AlignmentID' for deep nested subview alignment.

Custom Views

-   Demo code of creating a colorwheel
-   Custom Shapes: adhere to Shape { func path(in rect: CGRect) -\>
    Path, optional var animatableData: AnimatableData }
-   Modifier: .tapAction { ... }
-   Custom Transisitions (scaleAndFade shown in demo)
-   Uses ViewModifier { func body(content: Content) -\> some View }
-   let transition = AnyTransition.modifier(active: modifier identity:
    modifier)
-   drawingGroup() draws everything with Metal in CALayer

Day 5, session 2, Core ML TuriCreate
====================================

-   Two new tasks: 1) One-Shot Object Detection task, 2) Drawing
    Classification task
-   Instead of having multiple images of the same class, One-Shot will
    automatically augment a set of pictures with your classes single
    training image
-   Demo in Jupiter notebook
-   turicreate.load\_images("./") loads all files in directory
-   "SFrame" is a container for all your data
-   turicreate.on\_shot\_object\_detector.create(sframe, 'label') trains
    & creates the ML model
-   Super easy way to create a model for image recognition!!
-   New input: Apple Pencil
-   Build Drawing Classification model from SVG or images, and results
    in \<500kB on-device model for detecting Apple Pencil drawings
-   Watch this video as a good primer, if you want to create an image
    recognition app!
-   Very handy "Interactive Visualisation / Verification Explorer" which
    visualizes the results of the model training & verification

Day 5, session 3, Creating ML Experiences
=========================================

-   "Design more than just the interface"
-   Very high level talk about ML experiences, good watch for customers
    wanting to use ML & for Interaction Designers
-   Outputs: multiple options (all results from confidence list result),
    attributes (how does the app decide?), confidence (how sure?),
    limitations
-   State real facts in attributions "Top Picks, because you love
    cooking" =\> "Top Picks, because you downloaded NY Cooking"
-   Convert confidence levels into easy to understand information /
    actions.
-   Use 'ranges' for confidence effect (you'll arrive between
    13:10-13:20)
-   Coaching tips like with Animoji: "Low Light", "Camera Covered"
-   Limitation with alternatives in macOS: "Set a timer for 20 minutes."
    "Sorry, can't set a timer, how about a reminder?"
-   BasketBall ML app uses neat calibration setup: auto detects basket &
    starts keeping the score
-   Implicit Feedback, used in for example Siri Suggestions
-   Explicit Feedback: buttons like/dislike are unclear what action will
    follow. "Show less from this Author" is more specific.
-   Corrections: fixing mistake, example in Keyboard. When you type a
    name, correct the suggestion, then the Keyboard learns
-   In Photos app, the auto-correct rotation & crop result will only be
    the starting point of your action. You can then tweak it.

Day 5, session 5, What's New in Core Bluetooth
==============================================

-   Bluetooth hardware/software:

<!-- -->

-   BR/EDR devices ('classic devices') support was missing in
    CoreBluetooth, until now: this means CoreBluetooth can now talk to
    áll accessories, cars, etc.
-   Physical layer rate goes from 1Mbps to 2Mbps with Bluetooth 5.0,
    (available in iPhone 8+)
-   Advertising Extensions means a larger advertisement payload can be
    send (after smaller packet first)
-   Extended Connections: wakes up the host processor only AFTER a BLE
    connection handshake; requires support in accessory; less battery
    drain
-   Core Bluetooth abstracts over BR/EDR & BLE differences (BR/EDR
    doesn't have GATT traditionally)
-   Connection Event, send on matching connections!
-   Dual-Mode Pairing: cross transport key derivation (BE 4.2 SIG spec),
    same CBPeripheral, but both BLE and classic transport.
-   Any LE connection can also be BR/EDR connected by iOS 13, etc (add
    option in CB options).

<!-- -->

-   Privacy:

<!-- -->

-   Bluetooth access must be actively authorized for your app
-   Apple Notification Center Service (ANCS), a GATT server service so
    your accessory can show your iOS notifications
-   "Share System Notifications" permission is required for ANCS

<!-- -->

-   Developer tools

<!-- -->

-   CB PacketLogger packet analysis application, visualizer. Decodes all
    SIG & Apple protocols
-   Live Capture: view packets between iOS \<=\> accessory on
    PacketLogger running on Mac.
-   Requires "iOS Bluetooth developer logging profile", app part of
    "Additional Tools for Xcode"

Questions:

-   Sending Heart Rate to other devices from Watch
-   Overwrite outgoing message buffer?

Core Bluetooth lab
==================

-   Can an Extended Runtime Watch application act as a Peripheral to a
    Central accessory and send Heart Rate information?

<!-- -->

-   Contact information recorded, will contact

<!-- -->

-   Overwrite outgoing message buffer?

<!-- -->

-   Use advertisements instead

Day 5, session 6, Siri Event Suggestions
========================================

-   Apps 'donate' events to Siri
-   If your app supports "Check-in" you get a balloon on the home screen
-   Intents.framework
-   Donating: INInteraction(...)
-   AppDelegate handler for Intent
-   Donations that are updates of earlier items, and done in the
    background will not trigger a donation notification
-   Donate when the details are being shown, otherwise the Siri
    notifications that happen with the donation seem out of context.
-   Don't recommend watching: very slow very low information density,
    instead just use documentation.
