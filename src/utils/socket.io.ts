/*
 * @Description: 全局socke.io
 * @Author: yong.li
 * @Date: 2023-12-18 15:58:07
 * @LastEditors: yong.li
 * @LastEditTime: 2024-02-18 10:03:34
 */
import siteMetadata from '@/config/siteMetadata'
import { io } from 'socket.io-client'
import localStorage from '@/utils/localStorage'
import { Socket } from 'socket.io-client'
let socketTimer: NodeJS.Timer

const currentUserInfo = localStorage.get('_USER_INFO')

let socket: Socket

/**
 * 初始化socket.io
 */
const initSocket = () => {
  socket = io(siteMetadata.webSocketUrl, {
    transports: ['websocket'],
    forceNew: true,
    reconnection: true // 自动重连
  })
  socket.on('connect', () => {
    console.log('socket connected')
    if (socketTimer) {
      clearInterval(socketTimer as unknown as number)
    }
    // 每隔15秒发送一次心跳
    socketTimer = setInterval(() => {
      socket.emit('ping', { data: currentUserInfo?.id, msg: '客户端心跳' })
    }, 15000)
  })
}

export { socket, initSocket }
