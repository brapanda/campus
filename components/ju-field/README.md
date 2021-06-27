## 更新日志

**2020-5-11**

1. 添加背景色，`mode="cube"` 时有效
2. 添加 field-group 的说明

## 说明

包含 2 种样式的文本框

## 实现

1. 对应 uni 文档的 input 属性；
2. 必填显示红色星号；
3. 错误信息红线和红框提示；
4. 获取焦点动态下划线；
5. 下划线模式、带背景框双模式；

## 属性

|       属性        |       类型       | 必填 |        默认         | 可选                                                                          | 说明                                                                     |
| :---------------: | :--------------: | :--: | :-----------------: | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
|       mode        |      String      |  -   |       default       | default <br>cube：有阴影的框模式                                              | 展示方式                                                                 |
|        id         |      String      |  -   |          -          |                                                                               | input 的 id                                                              |
|       label       |      String      |  -   |          -          |                                                                               | 输入框的 label                                                           |
|     labelIcon     |      String      |  -   |          -          |                                                                               | label 的图标                                                             |
|    labelAlign     |      String      |  -   |        left         | center：中间对齐；<br> right：右对齐；<br> justify：两端对齐                  | label 的对其方式                                                         |
|    labelWidth     |      String      |  -   |       100rpx        |                                                                               | label 设置固定宽度                                                       |
|    labelClass     |      String      |  -   |          -          |                                                                               | 单独设置 label 的背景颜色，建议在`mode='cube'`时使用                     |
|    placeholder    |      String      |  -   |          -          |                                                                               | 为空时的预留文本                                                         |
|       value       |      String      | yes  |          -          |                                                                               | 调用时传入 v-model                                                       |
|       type        |      String      |  -   |        text         | text/number/idcard/digit                                                      | 和 uni 文档保持一致                                                      |
|       name        |      String      |  -   |          -          |                                                                               | 文本框的 name                                                            |
|     maxlength     | Number / String  |  -   |         140         |                                                                               | 和 uni 文档保持一致                                                      |
|      border       | String / Boolean |  -   |        #eee         |                                                                               | 如果`mode=default`，设置底部线条颜色                                     |
|    focusBorder    |      String      |  -   |       #008CFF       |                                                                               | 获取焦点后设置底部线条颜色，如果`mode=default`且不设置，则不显示底部线条 |
|     required      |     Boolean      |  -   |          -          |                                                                               | 是否必填，为 `true` 则加上红色星号                                       |
|     errorText     |      String      |  -   |          -          |                                                                               | 错误文本，如果存在，显示错误提示                                         |
|     disabled      |     Boolean      |  -   |        false        |                                                                               | 是否启用                                                                 |
|   disabledLock    |      String      |  -   | base64 图片，锁图标 | 设置图片：base64 图片、图片路径 ； <br>设为`custom`且设置了 slot=disabledLock | 如果 disabled，且`mode="cube"`时，最前方会有一个小锁图标，图标可替换     |
| disabledLockClass |     Boolean      |  -   |        false        |                                                                               | 如果启用小锁图标，可以另外给小锁加 class                                 |
|   cursorSpacing   |      Number      |  -   |          -          |                                                                               | 和 uni 文档保持一致                                                      |
| placeholderStyle  |      String      |  -   |          -          |                                                                               | 和 uni 文档保持一致                                                      |
| placeholderClass  |      String      |  -   |  input-placeholder  |                                                                               | 和 uni 文档保持一致                                                      |
|       focus       |     Boolean      |  -   |          -          |                                                                               | 和 uni 文档保持一致                                                      |
|    confirmType    |      String      |  -   |        done         | send/search/next/go/done                                                      | 和 uni 文档保持一致                                                      |
|    confirmHold    |     Boolean      |  -   |          -          |                                                                               | 和 uni 文档保持一致                                                      |
|      cursor       |      Number      |  -   |          -          |                                                                               | 和 uni 文档保持一致                                                      |
|  selectionStart   |      Number      |  -   |         -1          |                                                                               | 和 uni 文档保持一致                                                      |
|   selectionEnd    |      Number      |  -   |         -1          |                                                                               | 和 uni 文档保持一致                                                      |
|  adjustPosition   |     Boolean      |  -   |        true         |                                                                               | 和 uni 文档保持一致                                                      |
|   holdKeyboard    |     Boolean      |  -   |          -          |                                                                               | 和 uni 文档保持一致                                                      |

## 方法

| 名称                 |       返回字段（包含默认返回）       | 说明                             |
| -------------------- | :----------------------------------: | -------------------------------- |
| input                |                value                 | 当键盘输入时，触发 input 事件    |
| focus                |          { value, height }           | 输入框聚焦时触发                 |
| blur                 |            {value: value}            | 输入框失去焦点时触发             |
| confirm              |            {value: value}            | 点击完成按钮时触发               |
| keyboardheightchange | {height: height, duration: duration} | 键盘高度发生变化的时候触发此事件 |

## 关联

**ju-field-group**

文本框的组，此组件并不设置任何 props，使用后，回给`mode="default"`生成上下两条灰色线条，`ju-field`就会缩进一些

## 调用示例

```html
<!-- 带分组 -->
<ju-field-group>
  <ju-field
    required
    class="mb-15"
    placeholder="请输入手机号码"
    label-icon="app-icon icon-phone font-size-20"
    type="number"
    maxlength="11"
    v-model="mobile"
    border="yellow"
    focus-border="purple"
    error-text="我错啦"
  />

  <ju-field
    required
    class="mb-15"
    placeholder="请输入手机号码"
    label-icon="app-icon icon-phone font-size-20"
    type="number"
    maxlength="11"
    v-model="mobile"
    border="yellow"
    focus-border="purple"
    error-text="我错啦"
  />
</ju-field-group>

<!-- 设置disabled，并且设置小锁图标class -->
<ju-field
  disabled
  disabled-lock-class="bg-red text-white"
  mode="cube"
  required
  class="mb-15"
  placeholder="请输入手机号码"
  label-icon="app-icon icon-phone font-size-20"
  type="number"
  maxlength="11"
  v-model="mobile"
  border="yellow"
  focus-border="purple"
  error-text="我错啦"
/>
```

```js
import juFieldGroup from "ju-field-group";
import juField from "ju-field";

export default {
  components: {
    juFieldGroup,
    juField,
  },
};
```

## slot

**slot=control**

右边插槽，例如文本框右边添加一个“获取验证码”按钮

**slot=inputBefore**

label 和 input 之间当插槽

**slot=disabledLock**

当`disabledLock="custim"`且设置了 `slot="disabledLock"`，插槽生效

```html
<ju-field
  mode=""
  placeholder="输入6位验证码"
  label-icon="app-icon icon-verification-code font-size-20"
  type="number"
  maxlength="11"
  v-model="code"
>
  <template
    slot="control"
  >
    <view
      class=""
      >获取验证码</view
    >
  </template>
</ju-field>
```
