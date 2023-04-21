import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type Animated from 'react-native-reanimated'
import { withTiming } from 'react-native-reanimated'
import { ControlledInput } from '@/ui'

interface BottomFormProps {
  translateY: Animated.SharedValue<number>
}
function BottomForm({ translateY }: BottomFormProps) {
  const [formType, setFormType] = useState<'login' | 'register'>('login')
  useEffect(() => {
    translateY.value = 300
    translateY.value = withTiming(0, { duration: 1000 })
  }, [translateY])

  // 定义表单验证规则
  const loginSchema = z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码长度至少为 6 个字符'),
  })

  const registerSchema = z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码长度至少为 6 个字符'),
    confirmPassword: z.string().min(6, '密码长度至少为 6 个字符'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formType === 'login' ? loginSchema : registerSchema),
  })
  // 定义切换表单类型的处理函数
  function handleSwitchFormType() {
    // 清空表单验证状态
    reset({
      email: '',
      password: '',
      confirmPassword: '',
    })

    // 切换表单类型
    setFormType(formType === 'login' ? 'register' : 'login')
  }

  return (
    <View style={styles.formContainer}>
      {/* 切换表单类型 */}
      <TouchableOpacity onPress={handleSwitchFormType}>
        <Text style={styles.formTypeText}>{formType === 'login' ? '没有账户？去注册' : '已有账户？去登录'}</Text>
      </TouchableOpacity>

      {/* 表单项 */}
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="邮箱"
        keyboardType="email-address"
        placeholder="请输入邮箱"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="密码"
        secureTextEntry={true}
        placeholder="请输入密码"
      />
      {formType === 'register' && (
        <>
          <ControlledInput
            testID="confirmPassword-input"
            control={control}
            name="confirmPassword"
            label="确认密码"
            secureTextEntry={true}
            placeholder="请再次输入密码"
          />
        </>
      )}

      {/* 提交按钮 */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: formType === 'login' ? '#6c63ff' : '#ff69b4' }]}
        onPress={handleSubmit(data => Alert.alert(JSON.stringify(data)))}
      >
        <Text style={styles.buttonText}>{formType === 'login' ? '登录' : '注册'}</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#6c63ff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  formTypeText: {
    color: '#6c63ff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
})

export default BottomForm
