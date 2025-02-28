<template>
  <div>
    <!-- This page is always here so we hardcode the component. -->
    <bread-crumb-with-back :paths="aboutPaths" />
    <!-- TODO: Should I put aboutPaths in another global .ts file? -->
    <!-- Does variables in this component destruct when the user switch to another page? -->

    <!-- This is not a post, using the post mechanic might be weird. -->
    <!-- For simplicity we hardcode this page. -->
    <div style="padding: var(--el-main-padding);">
      <h1>关于</h1>
      <el-tabs>
        <el-tab-pane label="关于本站">
          <p>本站是一个以开发日志为主要内容的博客站点，由github pages提供服务。作者是一个主要写C++的工程师，并没有专业前端经验。</p>
          <p>建立这个站点的初衷在于：</p>
          <ul>
            <li>平时开发中，开发者们经常会偶尔为了一些奇奇怪怪的问题冥思苦想很久，终于在搜索几个小时后发现一些自己原先并不了解的细枝末节之处。随着岁月流逝，我们回过头阅读曾经的代码时，常常会忘记当时为什么这样写，更别提有时候会重写一个技术架构相似的新项目，就更想不起来当时是如何解决这一问题的，以至于反复踩坑。这种事情并不少见，尤其要注意到，许多工程师在自己的专业领域外仍然会出于兴趣、工作等因素碰见自己并不完全了解但又略知一二的问题。记录日志可以让我们在回顾问题时更容易找到当时留下的痕迹。</li>
            <li>不写文档的话开发会很容易陷入缺乏设计而后陷入瓶颈的情况；一上来就要求自己写完善文档的话又很容易半路弃疗orz。开发日志作为折中手段，既不那样容易因为麻烦而放弃，也基本不会碰到“一周之后上帝也不知道我写了什么”的苦恼。</li>
            <li>闲着也是闲着（bushi</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="技术方案">
          <p>本站采用Nuxt.js 3作为主要框架，使用Element Plus组件。本站对应的github仓库包含完整源代码。</p>
          <p>除此之外的组件均为手搓，难免有些问题，遇到网站bug的话不妨在issue区留下复现过程。</p>
        </el-tab-pane>
        <el-tab-pane label="规划">
          <ul>
            <li>将会使用一个不同于Nuxt.js默认的图标（favicon）。</li>
            <li>将修改meta信息，令标签页显示自定义内容。</li>
            <li>将顶部导航栏固定住。</li>
            <li>在足够长的页面添加滚动条和回到顶部组件。</li>
            <li>“技术方案”栏目有点空，以后换上powered by标记；记得考虑trademark使用合法性。</li>
            <li>主体框架完工后更改左上角标题和图标。</li>
            <li>添加顶部搜索栏，支持按标签检索。</li>
            <li>尽量避免硬编码：目前关于页面和github链接都属硬编码。</li>
            <li>其他文章右侧会显示目录。多数文章可能不会分很多章节，因此可能比较空；目录部分还会放标签筛选器。</li>
            <li>
              响应式尺寸；移动端的部分适配。页面足够小时：
              <ul>
                <li>左侧导航菜单缩小为一个按钮；</li>
                <li>右上角工具栏收纳进弹出式菜单；</li>
                <li>右侧目录合并到文章顶部；</li>
                <li>左上角只显示图标。</li>
              </ul>
            </li>
            <li>
              测试组件性能：
              <ul>
                <li>是否加载了不必要的组件；</li>
                <li>是否有不必要的客户端渲染；</li>
                <li>网速低下时的正确显示。</li>
              </ul>
            </li>
            <li>没有上传文章时，菜单栏应正确显示空；目前的禁用菜单项只是临时解决方案。</li>
            <li>404页面的处理；目前虽然有404页面，但无论功能还是外观都有待改进；而且http状态码并不是404。对此使用...all路由可能不是个好主意。</li>
            <li>使用CDN加载第三方组件。</li>
            <li>支持markdown；这样我就能更容易地管理文章，不用写一堆Vue.js组件。</li>
            <li>查看storage和js分别被禁用的情况下，网站是否正常工作；可能只会加一个提示页面，不保证提供无js兼容性。</li>
            <li>处理tabindex。</li>
            <li>在“关于”页面添加回归测试清单。</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="已知问题">
          <ul>
            <li>h2比h1还大。也许这不是bug？</li>
            <li>如果直接通过url访问“关于”页面，右上角的关于菜单项不会高亮。</li>
            <li>通过“关于”菜单项访问“关于”页面后通过其他方式回到主页，“关于”菜单项不会取消高亮。</li>
            <li>访问不存在的资源后通过浏览器的后退按钮后退，再按下前进按键，右上角工具栏的样式会失效。在firefox上测试。</li>
          </ul>
        </el-tab-pane>
      </el-tabs>      
    </div>
  </div>
</template>

<script setup lang="ts">
  import BreadCrumbWithBack from '~/components/BreadCrumbWithBack.vue'

  const router = useRouter()
  const aboutPaths:NamedPaths = [{name: "主页", to: "/"}, {name: "关于", to: "/about"}]
</script>
