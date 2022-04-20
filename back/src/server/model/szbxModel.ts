/**
 * USER MODEL
 */
import {User as _User} from './user/user'
import {IModelUser as _IModelUser} from './user/iModelUser';
import {UserToken as _Token} from './user/token/userToken';
import {IModelUserToken as _IModelUserToken} from './user/token/iModelUserToken';
import {UserReport as _Report} from './user/report/userReport'
import {IModelUserReport as _IModelUserReport} from './user/report/iModelUserReport'
import {UserMessage as _Message} from './user/message/userMessage'
import {IModelUserMessage as _IModelUserMessage} from './user/message/iModelUserMessage'
import {UserMacadress as _Macadress} from './user/macadress/userMacadress'
import {IModelUserMacAdress as _IModelUserMacAdress} from './user/macadress/iModelUserMacAdress'
import {UserLogo as _Logo} from './user/logo/userLogo'
import {IModelUserLogo as _IModelUserLogo} from './user/logo/iModelUserLogo'
import {UserIp as _Ip} from './user/ip/userIp'
import {IModelUserIp as _IModelUserIp} from './user/ip/iModelUserIp'
import {UserHistory as _History} from './user/history/userHistory'
import {IModelUserHistory as _IModelUserHistory} from './user/history/iModelUserHistory'
import {UserFriend as _Friend} from './user/friend/userFriend'
import {IModelUserFriend as _IModelUserFriend} from './user/friend/iModelUserFriend'
import {UserDevice as _Device} from './user/device/userDevice'
import {IModelUserDevice as _IModelUserDevice} from './user/device/iModelUserDevice'
import {UserAction as _Action} from './user/action/userAction'
import {IModelUserAction as _IModelUserAction} from './user/action/iModelUserAction'

/**
 * TAG MODEL
 */
import {Tag as _Tag} from './tag/tag'
import {IModelTag as _IModelTag} from './tag/iModelTag'

/**
 * CATEGORIE MODEL
 */
import {Categorie as _Categorie} from './categorie/categorie'
import {IModelCategorie as _IModelCategorie} from './categorie/iModelCategorie'

/**
 * ROOM MODEL
 */
import {Room as _Room} from './room/room'
import {IModelRoom as _IModelRoom} from './room/iModelRoom'


export namespace SzBxModel {
    export namespace User {
        export const User = _User;
        export interface IModelUser extends _IModelUser {}
        export const Token = _Token;
        export interface IModelUserToken extends _IModelUserToken {}
        export const Report = _Report;
        export interface IModelUserReport extends _IModelUserReport {}
        export const Message = _Message;
        export interface IModelUserMessage extends _IModelUserMessage {}
        export const Macadress = _Macadress;
        export interface IModelUserMacAdress extends _IModelUserMacAdress {}
        export const Logo = _Logo;
        export interface IModelUserLogo extends _IModelUserLogo {}
        export const Ip = _Ip;
        export interface IModelUserIp extends _IModelUserIp {}
        export const History = _History;
        export interface IModelUserHistory extends _IModelUserHistory {}
        export const Friend = _Friend;
        export interface IModelUserFriend extends _IModelUserFriend {}
        export const Device = _Device;
        export interface IModelUserDevice extends _IModelUserDevice {}
        export const Action = _Action;
        export interface IModelUserAction extends _IModelUserAction {}
    }
    export namespace Tag {
        export const Tag = _Tag;
        export interface IModelTag extends _IModelTag {}
    }
    export namespace Categorie {
        export const Categorie = _Categorie;
        export interface IModelCategorie extends _IModelCategorie {}
    }

    export namespace Room {
        export const Room = _Room;
        export interface IModelRoom extends _IModelRoom {}
    }
}
