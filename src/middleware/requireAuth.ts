export const requireAuth = (
    traget, key: string, descriptor: TypedPropertyDescriptor<Function>
): any => {
    const originMethod = descriptor.value;
    return {
        get() {
            const emptyToken = !this.props.session.get('token', false);
            return emptyToken
                ? () => {
                    this.props.openLoginModal()
                }
                : originMethod; // .apply(this,arguments) 
        },
        set() {

        }
    }
}
