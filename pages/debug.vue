<template>
  <div>
    <h1>开发者页面</h1>
    <p>您发现了开发者页面！</p>
    <p>
      正常情况下您不应该看到该页面。然而，考虑到这是一个静态站点，任何人在这里随意点击都应该不会造成问题。该页面是为了针对特定的功能进行调试而添加的。如果您不知道如何回到正常页面，请将地址栏url中域名后的部分删去后回车。
    </p>
    <h2>404页面测试</h2>
    <p>
      本站并不将404错误视为致命错误，在Nuxt的框架下，致命错误将导向一个与应用根组件平行的页面。即便使用Nuxt
      Layout，也容易出现组件重新加载的现象。
    </p>
    <el-tooltip
      content="将您带到一个并不存在的路径，从而显示404页面内容。"
      :show-after="popupDelay"
    >
      <el-button type="primary" @click="trigger404()">触发404</el-button>
    </el-tooltip>
    <h2>致命错误测试</h2>
    <p>
      测试发生意外的致命错误时的行为。注意，这里不会对404做特殊处理，因此即便触发404错误也不会重定向到404页面，而是致命错误页面；本站设计上不会以这种方式触发404。
    </p>
    <el-form
      :size="formSize"
      ref="errInfoFormRef"
      style="max-width: 600px"
      label-width="auto"
      :rules="errInfoRules"
      :model="errInfo"
    >
      <el-form-item label="状态码" prop="statusCode">
        <el-input
          label="状态码"
          placeholder="输入状态码"
          v-model.number="errInfo.statusCode"
        />
      </el-form-item>
      <el-form-item label="附加信息" prop="statusMessage">
        <el-input
          label="附加信息"
          placeholder="输入附加信息"
          v-model="errInfo.statusMessage"
        />
      </el-form-item>
      <el-form-item label="其他属性">
        <div style="width: 100%; display: flex">
          <el-form-item prop="fatal">
            <template #label>
              <el-tooltip
                content="影响fatal字段，但无论其值如何都将导航至致命错误页面。"
                :show-after="popupDelay"
                placement="right"
              >
                <span style="align-items: center; display: flex">
                  致命性
                  <el-icon size="1em"><info-filled /></el-icon>
                </span>
              </el-tooltip>
            </template>
            <el-switch v-model="errInfo.fatal" />
          </el-form-item>
          <el-form-item label="未处理" prop="unhandled">
            <el-switch v-model="errInfo.unhandled" />
          </el-form-item>
        </div>
      </el-form-item>
      <el-tooltip
        content="这会将您导航到一个发生致命错误时显示的页面。"
        :show-after="popupDelay"
      >
        <el-button type="primary" @click="triggerError(errInfoFormRef)">
          触发错误
        </el-button>
      </el-tooltip>
      <el-tooltip
        content="以JSON格式显示当前错误对象的设定。"
        :show-after="popupDelay"
      >
        <el-button @click="previewError()">预览内容</el-button>
      </el-tooltip>
      <el-button @click="resetErrorInfo(errInfoFormRef)">重置</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

useHead({
  title: '开发者页面'
});

const popupDelay = 500; // milliseconds

// The NuxtError type also requires some methods so we do it simple...
interface ErrInfoRule {
  statusCode: number;
  statusMessage: string;
  fatal: boolean;
  unhandled: boolean;
}

const errInfo = reactive<ErrInfoRule>({
  statusCode: 500,
  statusMessage: '',
  unhandled: true,
  fatal: true
});
const errInfoRules = reactive<FormRules<ErrInfoRule>>({
  statusCode: [
    { required: true, message: '状态码不可为空', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value >= 100 && value < 600) {
          callback();
        }
        callback(new Error('请输入合法的HTTP状态码'));
      },
      trigger: 'blur'
    }
  ]
});

const formSize = ref<ComponentSize>('default');
// const errInfoFormRef = useTemplateRef<FormInstance>('errInfoFormRef');
const errInfoFormRef = ref<FormInstance>();
// TODO: Writing it the other way works fine (?), yet ts-plugin reports:
//       cannot assign null to ... (the super long type declaration)
//       Requires further investigation.

const trigger404 = () => {
  return navigateTo('/someresourcethatdoesnotexist');
};
const triggerError = async (form: FormInstance | undefined) => {
  if (!form) return;
  await form.validate((valid, fields) => {
    if (valid) {
      showError(errInfo);
    } else {
      ElNotification({
        title: '未能触发错误',
        message: '表单中存在不符合要求的项目',
        type: 'error'
      });
    }
  });
};
const resetErrorInfo = (form: FormInstance | undefined) => {
  if (!form) return;
  form.resetFields();
};

const errInfoJsonStr = computed(() => {
  return JSON.stringify(errInfo, null, 2);
});
const previewError = () => {
  ElMessageBox.alert(errInfoJsonStr.value, '错误信息预览', {});
};
</script>
