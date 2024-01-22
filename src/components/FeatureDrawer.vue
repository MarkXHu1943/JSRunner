<template>
  <a-drawer
    :visible="visible"
    :header="false"
    @ok="handleOkClick"
    @cancel="handleCancelClick"
    width="65%"
    unmountOnClose
  >
    <div class="drawer-content">
      <a-form ref="formRef" :model="formData" layout="vertical">
        <a-form-item field="icon" label="图标" required>
          <a-image
            :src="formData.icon"
            :width="55"
            :height="55"
            :preview="false"
            style="margin-right: 10px"
          />
          <a-button
            v-if="formData.icon !== '/logo.png'"
            @click="formData.icon = '/logo.png'"
            style="margin-right: 10px"
            >默认图标</a-button
          >
          <a-button v-else @click="handleIconPickClick">选择图标</a-button>
        </a-form-item>
        <a-form-item field="description" label="描述" required>
          <a-input
            v-model:model-value="formData.description"
            :max-length="100"
            allow-clear
            show-word-limit
          />
        </a-form-item>
        <a-form-item field="feature.platform" label="平台" required>
          <a-select
            v-model:model-value="formData.feature.platform"
            :defaultValue="[currentPlatform]"
            :options="[
              { label: 'Windows', value: 'win32' },
              { label: 'MacOS', value: 'darwin' },
              { label: 'Linux', value: 'linux' }
            ]"
            :allow-search="false"
            multiple
          >
          </a-select>
        </a-form-item>
        <a-form-item field="feature.cmds" class="cmd-list">
          <template #label>
            <div class="cmd-add">
              <a-dropdown
                @select="(key: any
              ) =>handleSelect(key)"
              >
                <a-button type="outline" style="margin-bottom: 15px" long>
                  添加命令
                  <template #icon>
                    <icon-plus />
                  </template>
                </a-button>
                <template #content>
                  <a-doption v-for="(item, key) in FeatureTypeMap" :key="key" :value="key">
                    {{ item.desc }}
                    <template #icon>
                      <component :is="item.icon" />
                    </template>
                  </a-doption>
                </template>
              </a-dropdown>
              <a-button @click="handleHelpClick" type="text" style="margin-bottom: 15px" long>
                帮助
                <template #icon>
                  <icon-info-circle />
                </template>
              </a-button>
            </div>
          </template>
          <a-form
            ref="cmdFormRefs"
            v-for="(cmd, index) in formData.feature.cmds"
            :key="index"
            :model="formData.feature.cmds[index]"
            class="cmd-item"
          >
            <div class="cmd-desc">
              <div class="info">
                <component :is="FeatureTypeMap[cmd.type].icon" />
                {{ FeatureTypeMap[cmd.type].desc }}
              </div>
              <div class="handler">
                <a-button
                  type="text"
                  shape="circle"
                  @click="formData.feature.cmds.splice(index, 1)"
                >
                  <icon-delete />
                </a-button>
              </div>
            </div>
            <template v-if="cmd.type === 'text'">
              <a-form-item field="label" label="关键字" required>
                <a-input v-model:model-value="cmd.label" autofocus />
              </a-form-item>
            </template>
            <template v-if="cmd.type === 'regex'">
              <a-form-item field="label" label="关键字" required>
                <a-input v-model:model-value="cmd.label" autofocus />
              </a-form-item>
              <a-form-item field="match" label="正则">
                <a-input v-model:model-value="cmd.match" />
              </a-form-item>
              <a-form-item field="minLength" label="最小长度">
                <a-input-number v-model:model-value="cmd.minLength" />
              </a-form-item>
              <a-form-item field="maxLength" label="最大长度">
                <a-input-number v-model:model-value="cmd.maxLength" />
              </a-form-item>
            </template>
            <template v-if="cmd.type === 'over'">
              <a-form-item field="label" label="关键字" required>
                <a-input v-model:model-value="cmd.label" autofocus />
              </a-form-item>
              <a-form-item field="exclude" label="排除">
                <a-input v-model:model-value="cmd.exclude" />
              </a-form-item>
              <a-form-item field="minLength" label="最小长度">
                <a-input-number v-model:model-value="cmd.minLength" />
              </a-form-item>
              <a-form-item field="maxLength" label="最大长度">
                <a-input-number v-model:model-value="cmd.maxLength" />
              </a-form-item>
            </template>
            <template v-if="cmd.type === 'img'">
              <a-form-item field="label" label="关键字" required>
                <a-input v-model:model-value="cmd.label" autofocus />
              </a-form-item>
            </template>
            <template v-if="cmd.type === 'files'">
              <a-form-item field="label" label="关键字">
                <a-input v-model:model-value="cmd.label" autofocus />
              </a-form-item>
              <a-form-item field="fileType" label="文件类型">
                <a-radio-group v-model:model-value="cmd.fileType">
                  <a-radio model-value="file">文件</a-radio>
                  <a-radio model-value="directory">文件夹</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item field="match" label="正则">
                <a-input v-model:model-value="cmd.match" />
              </a-form-item>
              <a-form-item field="minLength" label="最小长度">
                <a-input-number v-model:model-value="cmd.minLength" />
              </a-form-item>
              <a-form-item field="maxLength" label="最大长度">
                <a-input-number v-model:model-value="cmd.maxLength" />
              </a-form-item>
            </template>
            <template v-if="cmd.type === 'window'">
              <a-form-item field="label" label="关键字" required>
                <a-input v-model:model-value="cmd.label" autofocus />
              </a-form-item>
              <a-form-item field="app" label="应用">
                <a-input v-model:model-value="cmd.match.app" />
              </a-form-item>
              <a-form-item field="title" label="标题">
                <a-input v-model:model-value="cmd.match.title" />
              </a-form-item>
              <a-form-item field="class" label="类名">
                <a-input v-model:model-value="cmd.match.class" />
              </a-form-item>
            </template>
          </a-form>
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import {
  IconCommand,
  IconCodeBlock,
  IconCode,
  IconFile,
  IconImage,
  IconLayout
} from '@arco-design/web-vue/es/icon'
import { Form, Message } from '@arco-design/web-vue'
import { PLATFORM } from '@/utils'
import { readFileSync } from '@/preload'
import { Feature } from '@/types/feature'
import { useCodeStore } from '@/store/useCodeStore'

export interface FeatureForm {
  icon: string
  description: string
  feature: Feature
}

const currentPlatform = PLATFORM as 'win32' | 'darwin' | 'linux'

const formRef = ref<InstanceType<typeof Form> | null>(null)
const cmdFormRefs = ref<InstanceType<typeof Form>[]>([])

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})

const formData: Ref<FeatureForm> = ref({
  icon: '/logo.png',
  description: '',
  feature: {
    code: '',
    explain: '',
    platform: [currentPlatform],
    icon: '',
    cmds: [
      {
        type: 'text',
        label: ''
      }
    ]
  }
})

const FeatureTypeMap: Record<Feature['cmds'][0]['type'], any> = {
  text: {
    desc: '功能关键字',
    icon: IconCommand,
    model: {
      label: '',
      type: 'text'
    }
  },
  regex: {
    desc: '正则匹配',
    icon: IconCode,
    model: {
      label: '',
      type: 'regex',
      match: '',
      minLength: 1,
      maxLength: 1000
    }
  },
  over: {
    desc: '任意文本',
    icon: IconCodeBlock,
    model: {
      label: '',
      type: 'over',
      exclude: '',
      minLength: 1,
      maxLength: 1000
    }
  },
  img: {
    desc: '图片匹配',
    icon: IconImage,
    model: {
      label: '',
      type: 'img'
    }
  },
  files: {
    desc: '文件匹配',
    icon: IconFile,
    model: {
      label: '',
      type: 'files',
      fileType: 'file',
      match: '',
      minLength: 1,
      maxLength: 1000
    }
  },
  window: {
    desc: '窗口匹配',
    icon: IconLayout,
    model: {
      label: '',
      type: 'window',
      match: {}
    }
  }
}

async function handleOkClick() {
  const promises = [formRef.value?.validate(), ...cmdFormRefs.value.map((form) => form.validate())]

  const res = await Promise.all(promises)

  if (res.some((item) => Object.keys(item || {}).length)) {
    return
  }

  utools.setFeature({
    code: 'exec/' + useCodeStore().id,
    explain: toRaw(formData.value.description),
    platform: toRaw(formData.value.feature.platform),
    icon: toRaw(formData.value.icon),
    // 归一化
    cmds: toRaw(formData.value.feature.cmds).map((cmd) => (cmd.type === 'text' ? cmd.label : cmd))
  })

  Message.success('添加成功')

  visible.value = false
}

function handleCancelClick() {
  visible.value = false
}

function handleIconPickClick() {
  const res = utools.showOpenDialog({
    title: '选择图标',
    properties: ['openFile'],
    filters: [
      {
        name: 'Images',
        extensions: ['jpeg', 'jpg', 'png', 'gif']
      }
    ]
  })

  if (!res || !res.length) {
    return
  }

  try {
    const icon = readFileSync(res[0], 'base64')
    formData.value.icon = `data:image/png;base64,${icon}`
  } catch (error) {
    Message.error('图标读取失败 ' + error)
  }
}

function handleHelpClick() {
  const url = 'https://www.u.tools/docs/developer/config.html#features-cmds'
  utools.shellOpenExternal(url)
}

function handleSelect(select: keyof typeof FeatureTypeMap) {
  formData.value.feature.cmds.push(Object.assign({}, FeatureTypeMap[select].model))
}
</script>

<style lang="less" scoped>
.cmd-list {
  :deep(.arco-form-item-content) {
    display: flex;
    flex-direction: column;
  }

  :deep(.arco-form-item-label) {
    flex: 1;
  }
}

.cmd-add {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .arco-btn {
    flex: 0;
  }
}

.cmd-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--text-bg-color);
  padding: 10px;
  width: calc(100% - 20px);

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.cmd-desc {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 20px;
  user-select: none;

  svg {
    zoom: 1.2;
    margin: 0 5px;
  }
}
</style>
