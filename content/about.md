# 关于

## 关于本站

本站是一个以开发日志为主要内容的博客站点，由github pages提供服务。作者是一个主要写C++的工程师，并没有专业前端经验。

建立这个站点的初衷在于：

- 平时开发中，开发者们经常会偶尔为了一些奇奇怪怪的问题冥思苦想很久，终于在搜索几个小时后发现一些自己原先并不了解的细枝末节之处。随着时间流逝，我们回过头阅读曾经的代码时，常常会忘记当时为什么这样写，更别提有时候会重写一个技术架构相似的新项目，就更想不起来当时是如何解决这一问题的，以至于反复踩坑。这种事情并不少见，尤其要注意到，许多工程师在自己的专业领域外仍然会出于兴趣、工作等因素碰见自己并不完全了解但又略知一二的问题。记录日志可以让我们在回顾问题时更容易找到当时留下的痕迹。
- 不写文档的话开发会很容易陷入缺乏设计而后陷入瓶颈的情况；一上来就要求自己写完善文档的话又很容易半路弃疗orz。开发日志作为折中手段，既不那样容易因为麻烦而放弃，也基本不会碰到“一周之后上帝也不知道我写了什么”的苦恼。
- 闲着也是闲着（bushi

## 技术方案

本站采用Nuxt.js 3作为主要框架，使用Element Plus组件。本站对应的github仓库包含完整源代码。

除此之外的组件均为手搓，难免有些问题，遇到网站bug的话不妨在issue区留下复现过程。

## 规划

- 考察useDark()关联的组件变量的生命周期，避免反复调用useDark()。（目前这样的检查可能没有意义，因为顶部导航栏不会被卸载……预期是这样。）
- Nuxt.js似乎不需要注册plugins，需要整理代码，清除不用的包等工作。
- 将会使用一个不同于Nuxt.js默认的图标（favicon）。
- 将修改meta信息，令标签页显示自定义内容。
- “技术方案”栏目有点空，以后换上powered by标记；记得考虑trademark使用合法性。
- 主体框架完工后更改左上角标题和图标。
- 添加顶部搜索栏，支持按标签检索。
- 尽量避免硬编码：目前关于页面和github链接都属硬编码。
- 其他文章右侧会显示目录。多数文章可能不会分很多章节，因此可能比较空；目录部分还会放标签筛选器。添加一些导向资源页面（比如说cppreference）的外链也是不错的主意。
- 响应式尺寸；移动端的部分适配。页面足够小时：
  - 左侧导航菜单缩小为一个按钮；
  - 右上角工具栏收纳进弹出式菜单；
  - 右侧目录合并到文章顶部；
  - 左上角只显示图标。
- 测试组件性能：
  - 是否加载了不必要的组件；
  - 是否有不必要的客户端渲染；
  - 网速低下时的正确显示。
- 没有上传文章时，菜单栏应正确显示空；目前的禁用菜单项只是临时解决方案。
- 404页面的处理；目前虽然有404页面，但无论功能还是外观都有待改进；而且http状态码并不是404。对此使用...all路由可能不是个好主意。
- 使用CDN加载第三方组件。
- 支持markdown；这样我就能更容易地管理文章，不用写一堆Vue.js组件。
- 查看storage和js分别被禁用的情况下，网站是否正常工作；可能只会加一个提示页面，不保证提供无js兼容性。
- 处理tabindex。
- 应用nuxt的layout机制，这可以为样式接近的页面的书写带来一些方便。
- 动效，这些动效如果不能或难以实现的话可能取消或推迟：
  - 整体页面在切换夜晚模式时的渐变效果；
  - 含返回键面包屑的返回按钮动效（这更多是一个设计问题，element-plus本身的组件也不是全部具有悬浮动效，我在考虑加不加）；
  - 类似element-plus官网那样的顶部导航栏半透明效果。
- 使用异步组件，避免一次性加载进大量不必要的组件。
- 处理aria，提升辅助设施体验。
- 考虑是否有办法打包时去除EXIF等非必要信息，以及其他自定义构建过程。
- 改进错误页外观。
- 使用md重写本页。
- 目前posts的嵌套处理很可能不正确；添加标签功能，在md中标记日期。
- 默认prose有点丑，后面会重写。尤其是backquote不要加双引号。

## 已知问题

- h2比h1还大。也许这不是bug？
- 如果直接通过url访问“关于”页面，右上角的关于菜单项不会高亮。
- 通过“关于”菜单项访问“关于”页面后通过其他方式回到主页，“关于”菜单项不会取消高亮。
- 访问不存在的资源后通过浏览器的后退按钮后退，再按下前进按键，右上角工具栏的样式会失效。在firefox上测试。
- 开发模式部署下严重内存泄漏，node版本22.14.0。Github部署似乎无此问题（否则应该已经崩溃了）。尚不确定问题来源。
- 首次加载耗时较长，性能问题需要关注。
- 访问404页面时，调试工具4次提示路径不匹配，可能包含组件重复加载问题。
- 从测试页面触发404，并不会触发404页面的SSR日志，也不会触发网络请求。这可能是有意的设计？
- `posts`路由下存在水合问题，且本地调试环境下不发生。有待进一步调查。

## 测试清单

- 通过导航菜单切换到页面后通过任意其他方式（其他导航菜单、按钮、浏览器导航设施）切换到其他页面，应当取消原菜单对应项目高亮。
- 通过url直接访问页面，所有对应导航栏项目高亮。
- 使用各类导航设施（导航菜单、按钮、浏览器导航设施、地址栏）以任意顺序切换页面并切回，页面样式不应失效，尤其不应出现导航栏元素缺失。
- 左侧导航菜单在菜单项名字较长时不应产生溢出，不应产生横向滚动条，注意响应式尺寸联动。
- 在支持屏幕旋转的浏览器中，在横向模式下正常显示导航栏。
- 对于涉及滚动的组件，滚动条滚动范围完全（不会有某个元素滚动不到）。
- 顶部导航栏显示在其他内容上方，下方元素不应透过顶部导航栏与用户互动。
- 错误页面和一般页面之间的切换不应触发导航栏重新加载。
- 发生错误时，客户端应当能够接收到对应错误码，而非仅在页面显示错误码；例如访问不存在的路径时，应当保证客户端确实收到携带404状态码的响应。
- 正确处理published = false的文章。
- 映射英文url。
- 确保与符号、小于号等正常处理，不出现转义失败。对不想转义而原样输出的序列，不应被转义。
- 或许有办法不用每个md文件都写标题和title元信息。
