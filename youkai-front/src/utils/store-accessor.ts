/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import PasswordAttackStatus from '~/store/PasswordAttackStatus';

let PasswordAttackStatusStore: PasswordAttackStatus
function initialiseStores(store: Store<any>): void {
    PasswordAttackStatusStore = getModule(PasswordAttackStatus, store)
}

export { initialiseStores, PasswordAttackStatusStore }