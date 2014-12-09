# Developers information

## Coding conventions 

* We use 4 spaces indents, no tabs.
* We use Allman indent style:
```javascript
function sum(n, p)
{
    var r = n + p;
    return r;
}
```
* Naming convention
```javascript
var someVariable;//Camel case starting lowercase
function some_function()//Lowercase with underscores
{
    //do stuff
}
var newObject = new ObjectType();//Objects with camel case starting uppercase
```
* We use HTML5 with the following conventions for classes and IDs:
```html
<div id="someId" class="some-class">
    <p>Block elements should always be on their own line, but <em>inline elements<em> can be used this way</p>
</div>
```
