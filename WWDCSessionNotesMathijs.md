WWDC Session Notes Mathijs

Dag 2 - Dinsdag
---------------

What's new in Xcode
-------------------

Xcode now has Swift package manager integration, so you can use packages
in your apps.

UI improvements: you can add split views like in other editors. You can
use the canvas preview with SwiftUI.

SF symbols are added, your own custom symbols are also possible, use an
asset catalog.

Assets in asset catalogs can now be Localized!

You can have asset colours and images vary for light/dark mode.

Use the environment overrides button (in the debugger bar) to test dark
mode and accessibility.

### Conditions

Xcode now supports test plans. You can run tests for many different
states/configurations in one go.

### Instruments

Now has hierarchical tracks.

You can use os.signpost to surface your own data in the debugger. For
example: measuring your networking code or JSON decoding (PostNL).

Use UIViewRepresentable to use SwiftUI views in your existing UIKit
apps.

Creating great localized experiences
------------------------------------

### Selecting languages

New iOS/macOS setting: change the language per app, independent of the
system language

        This means you no longer need a language picker inside the app

        You can create a button that launches into settings

        Use state restoration because the app gets relaunched

### Workflow

The xcodebuild command can be used to import/export localizations
automatically or in your scripts.

You can use a stringsdict for strings that vary by device class
(example: tap here on iPhone/iPad vs. click here on a Mac).

### Asset localization

Images and symbol sets (new) can be localized right in the asset
catalog, just press the 'Localize' button!

### Localized screenshots with XCTest

Xcode now supports test plans, this lets you run tests for multiple
different configurations at once.

        Use accessibility identifiers to have your UI tests be
independent of the current language.

        Settings for localization screenshots are under: UI Testing -\>
Localization screenshots -\> On

Q: Is it useful to create a test suite just for taking app store
screenshots? These tests will just navigate through the right screens in
the app but not assert anything.

Swift UI introduction - Creating your first app
-----------------------------------------------

The SwiftUI view data structure gets compressed aggressively. So using
small views to abstract things is fine and is encouraged.

Properties of views are either a source of truth (@State, @Binding) or
derived from a source of truth (var, let).

There's live mode vs. Preview mode. Preview mode lets you inspect
components, tweak them and drag new ones in. Live mode runs the app as
if it were in the simulator so you can interact with it.

You need the macOS Catalina beta to use previews at all.

### State properties

In for example UIKit, the number of states and event orderings in your
views makes for a combinatorial explosion of different states. SwiftUI
tries to remedy this problem. SwiftUI scales with your brain, virtually
eliminating UI inconsistencies.

iPad apps on the Mac
--------------------

\<architecture picture of the OS'es\>

Al lower level frameworks between iPadOS and macOS are unified.

Only WebKit, SceneKit, Mapkit etc are copies that run on top of either
AppKit or UIKit.

iPad apps on a Mac get a different bundle ID, prefixed with
'uikitformac'

.xcframework packages multiple platform versions of a library/framework
in a single bundle. Useful if you need to ship a binary.

You get a lot of functionality and "Mac-likeness" for free! That doesn't
mean you don't have to do anything. Adopt a mac icon, menus, toolbars,
touch bar, hover events, help, etc.

Other than that, differences between the platforms are subtle. Some
frameworks are not available because they don't make sense (use hardware
features of iPhone/iPad) or aren't ported (yet). Some types of
extensions are not available.

Introducing RealityKit & Reality composer
-----------------------------------------

Reality Composer: 3D design application from Apple that lets you easily
create AR and 3D worlds for use in your apps.

RealityKit: Enhances ARKit with occlusion and more.

------------------------------------------------------------------------

Dag 3 - Woensdag
================

Sign in With Apple
------------------

Privacy first. The user can choose what information they disclose.
Possible to request a unique ID, Full name, and/or verified email
address.

Apple UX, super smooth. 👌🏼

        Available on all of Apple's platforms. Via web also on Windows
and Android!

User can choose to hide their email address. In that case, you'll get a
unique email from Apple private email relay system.

Use the anti fraud bit to pick out suspected fake users.

### How to

1.  Add the entitlement
2.  Associate your domain with the app

ASAuthorization

Perform request: Apple ID or password autofill possible.

        Is it possible to upgrade a user from username+password to Apple
ID?

Perform an account check on launch. This call is very fast.

        Sign a user in if they already have an account,

        unlink in case they revoked.

        show the sign in UI if they don't have an account.

### Best practices

-   Check for existing account on startup
-   Use the real user indicator
-   Use the button API to draw the button
-   Implement on all your supported platforms

Implementing dark mode on iOS
-----------------------------

Instead of hardcoded colours, use semantic colours.

Primary, secondary tertiary backgrounds and more are provided by apple.
They already made a design system that you can adopt. But you can define
your own colors using an asset catalog.

Other than colors, there are materials, consisting of translucency on
top of a background.

        New materials (blur effects) are in the SDK

Implementing dark mode:

        Specify dark mode background colors and images in your asset
catalog.

Resolving colours yourself

Resolve dynamic colours in layoutSubviews()

Listen to traitcollectiondidchange/tintcolordidchange for changes

You can always safely set the current trait collection, even on a
background thread. If you do so, be consistent on which thread you do
it.

### Trait collections

There is not always one single trait collection in the app

The trait collection cascades downwards from

UIScreen -\> UIWindowScene -\> UIWindow -\> UIPresentationController -\>
UIViewController -\> UIView

Traits are predicted during UIView initialisation

You can override the traitcollection for a viewcontroller/view using the
property:

        overrideUserInterfaceStyle

        Q: so this does cascade downwards?

SwiftUI essentials
------------------

A good UI requires much more than just a component system.

It/you should support:

-   Accessibility
-   Multiple windows
-   Rich notifications
-   Multiplatform
-   Dark mode
-   Size classes

Also you add your own unique features, design, delighters.

Spend more time on the custom (and fun) stuff, less on the basic stuff.

Declarative vs. Imperative

Dollar sign -\> gets a binding

Modifiers create a new view from an existing view

        E.g. padding -\> color vs. Color -\> padding

Don't worry about the performance impact, SwiftUI builds a highly
optimised data structure

'some View' lets the compiler infer the return type

Primitive views: text, color, spacer, image, shape, divider are the
endpoint for the recursive view hierarchy.

Push your if's inside modifiers \[as a ternary\] to help SwiftUI better
detect changes and provide animations

There's a Form component that can contain heterogeneous elements and
order them into sections.

Buttons can change their look based on their container (VStack vs Form)
and platform.

Advances in UI datasources
--------------------------

The current state of the art: you have to create a UITableViewDataSource
and tell the tableViewController about updates yourself. This often goes
wrong, causing crashes (incorrect row count).

Introducing: Diffable data source. (UITableViewDiffableDataSource,
UICollectionViewDiffableDataSource)

Initialize this class with a closure that returns your cells. The
closure works similar to cellForRowAtIndexPath.

Differences in the data are calculated and animated automatically when
you call .apply()

        Nb: Data items need to conform to hashable

Performance is currently good, and will improve in the future. But
diffing is a linear operation, O(n) complexity. You can call apply()
from the background queue.

Oh, and it's a Swift only API!

Adopting Swift Packages in Xcode
--------------------------------

Xcode has SPM integration, yada yada. Booring.

If you document your sources using Swiftdoc comments, these docs will be
visible in the generated interface.

The xcshareddata directory contains the version lock, so don't forget to
check it in.

You can only have one version of a package in a workspace at a time.

        It can cause resolution errors if your version requirements
differ in the graph.

------------------------------------------------------------------------

Dag 4 - Donderdag
=================

Data flow through SwiftUI
-------------------------

Best practice: Create a single source of truth that propagates downward!

@State -\> this value can change over time, and view depends on it

-   Is view-local
-   The frameworks allocates & manages your storage
-   Mutation generates a new view body
-   Uses a property wrapper
-   Every @state is a source of truth
-   Views are a function of state, not a sequence of events

Publisher

-   .onReceive(PodcastPlayer.currentTimePublisher) { self.stateVariable
    = \$0 }

BindableObject (protocol)

-   Use it to connect existing data/services to SwiftUI
-   BindableObject is:



-   External
-   A reference
-   Developer managed

var didChange = PassthroughSubject\<Void, Never\>()

didChange.send()

@ObjectBinding creates a dependency from the view upon the model

-   You inject this dependency into the view
-   Automatic dependency tracking
-   Don't use this to pass models through the hierarchy, use
    @EnvironmentObject instead

@EnvironmentObject pushes data through the view hierarchy

Views are a low-cost abstraction. Using a lot is encouraged.

### How do I choose where this state belongs?

Compare it to button. Button has internal state for its highlight when
your finger is on it. That state is truly owned by the button. If it's
not, see if you can lift the state up, for example to a bindable object.

Introducing Combine & advances in Foundation
--------------------------------------------

### What's new

#### Diffing

ContiguousBytes

let compressed = try data.compressed(using: .lzfse)

Unit conversions, new units

RelativeDateTimeFormatter

#### OperationQueue

Has a high level API for doing work in sequence, and it now support
progress indication.

#### Combine

A unified declarative api for processing values over time

##### Combine key concepts

Publishers

        Defines how values and errors are produced

        Is a value type

        Allows for registration of a subscriber

        Example: \`NotificationCenter.Publisher\` publisher

Subscribers

        Counterpart to publisher

        Receives values and a completion

        Is a reference type

        Example: \`Subscribers.Assign\` is a keypath subscriber

Operator

        Returns a new publisher

        Changes values

Use combine today

1.  Compose small parts into custom publishers
2.  Adopt incrementally
3.  Add a Publisher to a property with @Published
4.  Compose callbacks and Publishers with Future

Integrating SwiftUI
-------------------

[![](images/image1.jpg)]{style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 288.00px;"}

### SwiftUI can be easily hosted in UIKit

-   Use UIHostingController
-   NSHostingController/NSHostingView
-   Use @IBSegueAction + UIHostingController to push a segue to a
    swiftui view

### UIKit in SwiftUI is also possible

-   UIViewRepresentable
-   UIViewControllerRepresentable

A Coordinator object can be used to wrap a binding to make target/action
work with UIKit views.

Integrating your data model

BindableObject protocol -\> var didChange: PublisherType

@ObjectBinding var data

Publishers

You can already get publishers from Apple out of:

-   KVO
-   Notifications
-   URLSession

PassthroughSubject

[![](images/image2.jpg)]{style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 424.50px; height: 362.98px;"}

Text recognition with the vision framework
------------------------------------------

You can now perform OCR with the framework, which is powered using
machine learning built by Apple.

Choose between fast (characters) vs. accurate (sentences, NLP). Fast is
meant for real time applications, accurate if you have more processing
time. Defer it to the background if possible.

Tips:

-   Apply your own business validation logic to weed out invalid results
    from the OCR. Example: if you want to recognize a phone number using
    OCR, check the format. Check if you get the same result back several
    times to better ensure it's valid.
-   It's a good idea to combine multiple ML/Vision/AI techniques
    together in a pipeline to improve your results.

Advances in networking part 2
-----------------------------

Use URLSession and Network.framework to get all the benefits of modern
networking

Bonjour is now on all major platforms, including Windows and Android.

Wide area service discovery can be done using Discovery Proxy. For
example, a bonjour printer that's on a different network \[segment\].

        Example
implementation:[ ](https://www.google.com/url?q=http://github.com/ietf-hackathon/mdnsresponder&sa=D&ust=1559977671983000)[github.com/ietf-hackathon/mdnsresponder](https://www.google.com/url?q=http://github.com/ietf-hackathon/mdnsresponder&sa=D&ust=1559977671983000)

------------------------------------------------------------------------

Dag 5 - Vrijdag
===============

Creating custom SwiftUI views
-----------------------------

Tip: .edgesIgnoringSafeArea(.all) modifier to ignore safe area

The parent view proposes a size for its child, but a child view always
chooses its own size, the parent cannot force that.

Next, the parent places the child in the parent's coordinate space.
Coordinates are rounded off to the nearest pixel.

"Focus on the things that make your app special." Also, avocado toast.

.padding(\[edges\]) gives you adaptive padding by default.

Modifiers always return a new view. So padding is a view.

Images are fixed size unless you mark them as resizable

.layoutPriority(n)

Defining a new vertical alignment:

        enum Foo: AlignmentID {

                static func defaultValue...

        }

### Custom Views

Use the Shape protocol, the only requirement is path(in rect:).

Implement animatableData to animate it.

ZStack stacks views on top of each other.

protocol ViewModifier

        Applies changes to another view

.drawingGroup() flattens all the SwiftUI views in a single one and
renders it with metal. This only works if the child views are Shapes.
For UIKit controls it won't work.

Great developer habits
----------------------

Programming takes craft, care & ingenuity. 👩🏼‍💻 Build good habits to
stay on track. Compare it to habits you've built for driving your car.
You automatically take care of many things without even realizing it.

### Organize

Clean (virtual) workspace

-   Organize functionally using groups that match the folder structure
    on disk
-   Storyboard references
-   Modernize your project file
-   File \> Project settings \> New build system

### Track

Use git.

### Document

Write clear commit messages. Write useful comments.

### Test

Use unit tests for code that you could forget (example:
serializing/deserializing), and is not covered by the type system. Use
them to test for regressions.

### Analyze

-   Use the network link conditioner
-   Use the address sanitizer to check for buffer overflows
-   Use thread sanitizer to check for race conditions
-   Use the undefined behavior sanitizer

### Evaluate

Use code review.

### Decouple

Split code up into packages/libraries/frameworks.

Creating great ML experiences
-----------------------------

All kinds of features use ML, such as the airpods, the keyboard,
photos\...

Example: photos categorizes the photos based on what's in them.

It takes more than just the \[user\] interface. Think about the
information design.

We have to design the model and its interface.

[![](images/image3.jpg)]{style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 370.00px; height: 439.66px;"}

Evaluation
----------

### Data

Lots of training data is crucial to get a good result.

Data needs to be designed.

Collect data intentionally. Data biases are lurking. Example: for face
recognition, collect data of all races and types of users. For an app
that's used outdoors, collect data from outdoors.

Optimize for the customers you want. Don't reflect the world, but create
for the world how you want it to be.

Test your app for biases.

Update data as product specifications change.

Beware of standard (academic) data sets, as these often don't represent
real experiences.

### Metrics

Evaluate your model. Design metrics to evaluate it. The metrics should
define if an experience is good. Your metrics reflect your values.

Inform users about the metrics, for example in Face ID: 1 in 1000000
chance of a stranger unlocking your device. Give it meaning to them.

Interface patterns
------------------

### Outputs

-   Multiple options



-   Choose from the results a feature generates
-   Provide a set of meaningfully different options, such as different
    routes in a navigation app.



-   Attributions



-   Avoid profiling people
-   State real facts, instead of "Top picks because you love cooking",
    say "Top picks because you love \$appName"
-   Cite the data source



-   Confidence -\> certainty measure



-   Translate into human terms instead of displaying just raw
    numbers/percentages
-   Provide a range in case of an estimation
-   



-   Limitations



-   Limitations happen when there's a mismatch between people's mental
    model of the feature and of what the feature actually does.
-   Guide people past limitations. Example: memoji. A tip is shown when
    there's too little light or the sensor is covered.
-   Manage expectations. Suggest alternative actions if something is
    impossible.

Outputs are a design medium.

### Inputs

-   Calibration



-   User provides essential information to make the feature work.
-   Be quick and effortless, only ask for essential information
-   Introduce, guide and confirm
-   Provide a way to update/remove the information



-   Implicit feedback



-   Improve the model based on interactions with the app.
-   Strive to identify people's intention
-   Accuracy over speed
-   Respect people's privacy
-   Make interactions more accurate and delightful



-   Explicit feedback



-   Prioritize negative feedback over positive.
-   Love/dislike? Clearly describe the action and its consequences.
    Provide different options to better understand the user's intention.



-   Corrections



-   Detect when the user fixes a mistake and update the model.
-   Use known tasks for this. For example, with spelling, the standard
    text editing is recognized and used.
-   Example: cropping in photos suggests a crop and allows the user to
    tweak it.

When we align the way we create with the values we uphold we can create
great experiences.

Getting the most out of multitasking \[on iPad\]
------------------------------------------------

### Architecting for multiple windows

#### AppDelegate

didFinishLaunching contains one time setup, and creates the initial user
interface

This pattern is invalid now, apps have a SceneDelegate which is
responsible for UI.

AppDelegate is responsible for process lifecycle.

Adopt SceneDelegate and UIKit will stop calling app delegate UI methods.

#### State restoration

#### Keeping scenes in sync

When you have multiple windows, you can have multiple instances of the
same viewController. Make sure that when you make a change in one, the
other will update with the changes.

requestSceneSessionActivation API opens a new window.

Designing and building great shortcuts
--------------------------------------

Create an overview of the features/activities of your app. Determine
what actions are valuable to do by voice.

Good shortcuts are repeatable, don't rely on visuals or tapping and are
invocable in most context.

Apple provides an "Add to Siri" button. Use this in a focused context,
when you suspect the user will want to do an action again some time.

Keep the activation phrase as short as possible. "Get the 35 bus
schedule" -\> "Bus schedule"

### Designing Siri interactions

Keep dialogue short and concise.

#### Summary

Shortcuts elevate your app's most repeatable features.

Use the add to siri button.
