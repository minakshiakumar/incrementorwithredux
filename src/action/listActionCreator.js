import * as ACTION_TYPE from './actionType'

export function getAllList(data) {
    return { type: ACTION_TYPE.GET_LIST, sortOrder: data.sortOrder };
}
export function changeListToolCheckStatus(data) {
    return { type: ACTION_TYPE.LIST_TOOL_CHECK_STATUS, listToolCheckStatus: data.listToolCheckStatus };
}