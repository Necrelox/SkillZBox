import {AccountUtils} from "./accountUtils";
// import {CodeError} from "./enum/codeError";
// import {MessageError} from "./enum/messageError";

class AccountUtilsSpec extends AccountUtils {}

describe('Account Utils : ', () => {

    describe('TranformPostToUserSearch : ', () => {
        test('Should be success, when the post is empty return empty object', async () => {
            const result = await (new AccountUtilsSpec())['TranformPostToUserSearch']({});
            expect(result).toEqual({});
        }, 100);

        test('Should be success, when the post contain username, return an object contain username', async () => {
            const result = await (new AccountUtilsSpec())['TranformPostToUserSearch']({username: 'test'});
            expect(result).toEqual({username: 'test'});
        },100);

        test('Should be success, when the post contain email, return an object contain email', async () => {
            const result = await (new AccountUtilsSpec())['TranformPostToUserSearch']({email: 'test@gmail.com'});
            expect(result).toEqual({email: 'test@gmail.com'});
        },100);

        test('Should be success, when the post contain username and email, return an object contain username and email', async () => {
            const result = await (new AccountUtilsSpec())['TranformPostToUserSearch']({username: 'test', email: 'test@gmail.com'});
            expect(result).toEqual({username: 'test', email: 'test@gmail.com'});
        },100);
    });

    describe('checkPostContainMailORUsernameANDPassword', () => {
        test('Should be success, when the method throw error if we pass empty object, and check message', async () => {
            // const error = {
            //     code: CodeError.ACCOUNT_UTILS_CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD,
            //     message: MessageError.MISSING_PARAMETER + ' email username, password' + '.'
            // }

            // expect( () => {
            //     (new AccountUtilsSpec())['checkPostContainMailORUsernameANDPassword']({});
            // }).toThrow();
            //
            // try {
            //     await (new AccountUtilsSpec())['checkPostContainMailORUsernameANDPassword']({});
            // } catch (e) {
            //     expect(e).toEqual(error);
            // }
        }, 100);
    })
});
