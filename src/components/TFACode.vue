<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="box" label-width="80px">
        <el-form-item label="宁盾URL" prop="ndKey" required>
            <el-input v-model="ruleForm.ndKey"></el-input>
        </el-form-item>
        <el-form-item label="令牌序号" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.tokenNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司名称" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.companyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="过期时间" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.expireTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码长度" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.passwordLength" disabled></el-input>
        </el-form-item>
        <el-form-item label="时间步进" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.timeStep" disabled></el-input>
        </el-form-item>
        <el-form-item label="令牌版本" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.version" disabled></el-input>
        </el-form-item>
        <el-form-item label="宁盾密钥" v-if="ruleForm.isTokenDetailVisible">
            <el-input v-model="tokenDetail.seed" show-password ></el-input>
        </el-form-item>
        <el-form-item>
            <el-col :span="8">
                <el-button type="primary" @click="onSubmit('ruleForm')">获取 2FA</el-button>
            </el-col>
            <el-col :span="8">
                <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
            </el-col>
            <el-col :span="8">
                <el-form-item>
                    Code: {{ ruleForm.code }}
                </el-form-item>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script>
    import {getCode1} from "../utils/2FAUtils";

    export default {
        name: "TFACode",
        data() {
            let validateInputStr = (rule, value, callback) => {
                if (this.verifySeed(value)) {
                    callback();
                } else {
                    callback(Error('密钥有误，请重新输入'))
                }

            };

            return {
                ruleForm: {
                    ndKey: '',
                    code: '',
                    isTokenDetailVisible: false,
                },
                rules: {
                    ndKey: [
                        {required: true, message: '请输入宁盾二维码内容/宁盾BASE64/宁盾密钥', trigger: 'blur'},
                        {validator: validateInputStr, trigger: 'blur'}
                    ]
                },
                json: '',
                tokenDetail: {
                    tokenNo: '',
                    companyName: '',
                    createTime: '',
                    expireTime: '',
                    timeStep: '',
                    serviceId: '',
                    seed: '',
                    passwordLength: '',
                    version: ''
                }
            }
        },
        methods: {
            dateFormat(date) {
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const strDate = date.getDate().toString().padStart(2, '0');
                return `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            },
            verifySeed(str) {
                let result = false
                try {
                    let jsonStr = ''
                    if (str.includes('http:')) {
                        if (str.includes('#')) {
                            let base64 = str.split('#')[1];
                            jsonStr = Buffer.from(base64, 'base64').toString()
                        }
                    } else {
                        jsonStr = Buffer.from(str, 'base64').toString()
                    }
                    this.json = JSON.parse(jsonStr)
                    result = true
                } catch (e) {
                    result = false
                }
                return result
            },

            fillData() {
                this.tokenDetail.tokenNo = this.json.token.serial
                this.tokenDetail.companyName = this.json.companyName
                let qrExpireDate = new Date(this.json.expireTime)
                let qrCreateDate = (new Date(qrExpireDate.setDate(qrExpireDate.getDate() - 3)))
                this.tokenDetail.createTime = this.dateFormat(qrCreateDate)
                let tokenExpireDate = new Date(this.json.token.expireTime)
                this.tokenDetail.expireTime = this.dateFormat(tokenExpireDate)
                this.tokenDetail.passwordLength = this.json.token.passwordLength
                this.tokenDetail.timeStep = this.json.token.timeStep
                this.tokenDetail.seed = this.json.token.seed
                this.tokenDetail.version = this.json.version
                this.ruleForm.isTokenDetailVisible = true
            },

            onSubmit(formName) {
                console.log(111)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.fillData()
                        this.ruleForm.code = getCode1(this.tokenDetail.seed)
                    } else {
                        console.log('bbb')
                        return false
                    }
                })
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .box {
        width: 480px;
    }
</style>