# jQuery scrollMaster  

A jQuery plugin for smooth scroll to target section with active link hilighting. Works bidirectionally i.e on click of link smooth scroll to section and when manually scroll is performed hilight appropriate link based on position of section.

## Basic setup
requires jQuery version 3.1.1

The most basic setup is as follows:

```html
<!DOCTYPE html>
<body>
<div class="main-container">
    <header > 
        <a href="#sec-1" >home</a>
        <a href="#sec-2">profile</a>
    </header>
        <div  class="container">
            <section id="sec-1" >sec-1</section>
            <section id="sec-2" >sec-2</section>
        </div>
</div>

    <script src="js/scrollMaster.js"></script>
    <script>
    $(function(){
        $("header a").scrollMaster({topOffset: 0})
    })
    </script>
</body>
</html>
```

## Configuration

This is the default configuration:

```javascript
topOffset: 80
```

topOffset  setting tells plugin, position of section from top where link activation should trigger.