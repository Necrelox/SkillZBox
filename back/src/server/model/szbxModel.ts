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
import {UserMacAddress as _MacAddress} from './user/macaddress/userMacaddress'
import {IModelUserMacAddress as _IModelUserMacAddress} from './user/macaddress/iModelUserMacAddress'
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
import {RoomUser as _RoomUser} from './room/user/roomUser'
import {IModelRoomUser as _IModelRoomUser} from './room/user/iModelRoomUser'
import {RoomMessageFile as _RoomMessageFile} from './room/messageFile/roomMessageFile'
import {IModelRoomMessageFile as _IModelRoomMessageFile} from './room/messageFile/iModelRoomMessageFile'
import {RoomMessage as _RoomMessage} from './room/message/roomMessage'
import {IModelRoomMessage as _IModelRoomMessage} from './room/message/iModelRoomMessage'
import {RoomHasTag as _RoomHasTag} from './room/hasTag/roomHasTag'
import {IModelRoomHasTag as _IModelRoomHasTag} from './room/hasTag/iModelRoomHasTag'
import {RoomHasCategorie as _RoomHasCategorie} from './room/hasCategorie/roomHasCategorie'
import {IModelRoomHasCategorie as _IModelRoomHasCategorie} from './room/hasCategorie/iModelRoomHasCategorie'
import {RoomAction as _RoomAction} from './room/action/roomAction'
import {IModelRoomAction as _IModelRoomAction} from './room/action/iModelRoomAction'

export namespace SzBxModel {
    export namespace User {
        export const User = _User;
        export interface IModelUser extends _IModelUser {uuid?: Buffer}
        export const Token = _Token;
        export interface IModelUserToken extends _IModelUserToken {uuid?: Buffer}
        export const Report = _Report;
        export interface IModelUserReport extends _IModelUserReport {uuid?: Buffer}
        export const Message = _Message;
        export interface IModelUserMessage extends _IModelUserMessage {uuid?: Buffer}
        export const MacAddress = _MacAddress;
        export interface IModelUserMacAddress extends _IModelUserMacAddress {uuid?: Buffer}
        export const Logo = _Logo;
        export interface IModelUserLogo extends _IModelUserLogo {uuid?: Buffer}
        export const Ip = _Ip;
        export interface IModelUserIp extends _IModelUserIp {uuid?: Buffer}
        export const History = _History;
        export interface IModelUserHistory extends _IModelUserHistory {uuid?: Buffer}
        export const Friend = _Friend;
        export interface IModelUserFriend extends _IModelUserFriend {uuid?: Buffer}
        export const Device = _Device;
        export interface IModelUserDevice extends _IModelUserDevice {uuid?: Buffer}
        export const Action = _Action;
        export interface IModelUserAction extends _IModelUserAction {uuid?: Buffer}
    }
    export namespace Tag {
        export const Tag = _Tag;
        export interface IModelTag extends _IModelTag {uuid?: Buffer}
    }
    export namespace Categorie {
        export const Categorie = _Categorie;
        export interface IModelCategorie extends _IModelCategorie {uuid?: Buffer}
    }

    export namespace Room {
        export const Room = _Room;
        export interface IModelRoom extends _IModelRoom {uuid?: Buffer}
        export const RoomUser = _RoomUser;
        export interface IModelRoomUser extends _IModelRoomUser {uuid?: Buffer}
        export const RoomMessageFile = _RoomMessageFile;
        export interface IModelRoomMessageFile extends _IModelRoomMessageFile {uuid?: Buffer}
        export const RoomMessage = _RoomMessage;
        export interface IModelRoomMessage extends _IModelRoomMessage {uuid?: Buffer}
        export const RoomHasTag = _RoomHasTag;
        export interface IModelRoomHasTag extends _IModelRoomHasTag {uuid?: Buffer}
        export const RoomHasCategorie = _RoomHasCategorie;
        export interface IModelRoomHasCategorie extends _IModelRoomHasCategorie {uuid?: Buffer}
        export const RoomAction = _RoomAction;
        export interface IModelRoomAction extends _IModelRoomAction {uuid?: Buffer}
    }
}
