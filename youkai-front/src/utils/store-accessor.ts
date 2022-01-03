/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import PasswordAttackStatus from '@/store/PasswordAttackStatus';
import FoundConditionSearchStatus from '@/store/FoundConditionSearchStatus';

let PasswordAttackStatusStore: PasswordAttackStatus
let FoundConditionSearchStatusStore: FoundConditionSearchStatus;

function initialiseStores(store: Store<any>): void {
    PasswordAttackStatusStore = getModule(PasswordAttackStatus, store);
    FoundConditionSearchStatusStore = getModule(FoundConditionSearchStatus, store);
}

export { initialiseStores, PasswordAttackStatusStore, FoundConditionSearchStatusStore }