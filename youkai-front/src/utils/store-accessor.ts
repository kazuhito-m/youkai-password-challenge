/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import PasswordAttacker from '@/store/PasswordAttacker';

let PasswordAttackerStore: PasswordAttacker
function initialiseStores(store: Store<any>): void {
    PasswordAttackerStore = getModule(PasswordAttacker, store)
}

export { initialiseStores, PasswordAttackerStore }