/**
 * 模块state类型引入
 */
import { TypeModuleStateUser } from './modules/user'
import { TypeModuleStateApps } from './modules/app'

/**
 * root层state类型定义
 */
export interface TypeRootState {
  count: number;
}

/**
  * vuex所有state类型定义集成
  */
export interface TypeAllState extends TypeRootState {
  user: TypeModuleStateUser;
  app: TypeModuleStateApps;
}
