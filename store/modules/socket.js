/* eslint-disable no-console */
// import Vue from 'vue'
export default {
    state: {
        messages: [],
        activeRooms: [],
        closedRooms: [],
        socket: null,
        message: {},
        userConnection: {},
        userConnectionStatus: '',
        finishedChatId: null,
        createRoom: null,
        seenMessage: null
    },
    getters: {
        getMessages(state) { return state.messages },
        getActiveRooms(state) { return state.activeRooms },
        getClosedRooms(state) { return state.closedRooms },
    },
    mutations: {
        SET_SOCKET(state, payload) { },
        ADD_MESSAGE(payload) { },
        SET_MESSAGE(state, payload) {
            payload.forEach((el) => {
                // el.isContextMenu = false
            })
            state.messages = payload
        },
        SET_ACTIVE_ROOMS(state, payload) {
            state.activeRooms = payload
        },
        SET_CLOSED_ROOMS(state, payload) {
            state.closedRooms = payload
        },
        CLEAR_MESSAGES(state) {
            state.messages = []
        },
        SEND_MESSAGE(state, payload) {
            // payload.message.isContextMenu = false
            if (payload.status === 'edited') {
                const index = state.messages.findIndex((mes) => {
                    return mes.id === payload.message.id
                })
                if (index > -1) {
                    state.messages.splice(index, 1, payload.message)
                }
            } else if (payload.status === 'deleted') {
                const index = state.messages.findIndex((mes) => {
                    return mes.id === payload.message.id
                })
                if (index > -1) {
                    state.messages.splice(index, 1)
                }
            } else {
                state.messages.push(payload.data)
            }
        },
        REMOVE_SOCKET(state) {
            if (state.socket) {
                state.socket.close()
                state.socket = null
            }
        },
        SET_USER_CONNECTION(state, payload) {
            state.userConnection = payload
            state.userConnectionStatus = `changed ${payload.room}`
        },
        FINISHED_CHAT_ID(state, payload) {
            state.finishedChatId = payload
        },
        CREATE_ROOM(state, payload) {
            state.createRoom = payload
        },
        CHANGE_ROOM(state, payload) {
            if (payload.status === 'updated') {
                const index = state.activeRooms.findIndex((room) => {
                    return room.id === payload.data.id
                })
                if (index > -1) {
                    state.messages.splice(index, 1)
                }
            }
        },
        SEEN_MESSAGE(state, payload) {
            state.seenMessage = payload
        },
        CHANGE_CONTEXT_MENU(state, payload) {
            state.messages.forEach((el) => {
                if (el.id === payload.id) {
                    el.isContextMenu = true
                }
            })
        },
        CLOSE_CONTEXT_MENU(state) {
            state.messages.forEach((el) => {
                el.isContextMenu = false
            })
        }
    },
    actions: {
        changeContextMenu({ commit }, data) {
            commit('CHANGE_CONTEXT_MENU', data)
        },
        closeContextMenu({ commit }) {
            commit('CLOSE_CONTEXT_MENU')
        },
        setSocket({ commit }, data) {
            commit('SET_SOCKET', data)
        },
        setMessage({ commit }, data) {
            commit('SET_MESSAGE', data)
        },
        setActiveRooms({ commit }, data) {
            commit('SET_ACTIVE_ROOMS', data)
        },
        setClosedRooms({ commit }, data) {
            commit('SET_CLOSED_ROOMS', data)
        },
        clearMessages({ commit }) {
            commit('CLEAR_MESSAGES')
        },
        sendMessage({ commit }, payload) {
            commit('SEND_MESSAGE', payload)
        },
        removeSocket({ commit }, data) {
            commit('REMOVE_SOCKET', data)
        },
        setUserConnection({ commit }, data) {
            commit('SET_USER_CONNECTION', data)
        },
        finishedChatId({ commit }, data) {
            commit('FINISHED_CHAT_ID', data)
        },
        createRoom({ commit }, data) {
            commit('CREATE_ROOM', data)
        },
        changeRoom({ commit }, data) {
            commit('CHANGE_ROOM', data)
        },
        seenMessage({ commit }, data) {
            commit('SEEN_MESSAGE', data)
        }
    },
}
