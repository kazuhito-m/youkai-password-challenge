import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
    name: 'applicationstatus',
    stateFactory: true,
    namespaced: true,
})
class AppricationStatus extends VuexModule {  // eslint-disable-line
    private wheels = 2

    @Mutation
    public incrWheels(extra: number) {
        this.wheels += extra
    }

    public get axles() {
        return this.wheels / 2
    }
}