export default (modules: any) => {
    let Query = {};
    let Mutation = {};
    let Subscription = {};
    // let resolverMap = {};

    Object.keys(modules).forEach((key) => {
        Query = { ...Query, ...modules[key].Query };
        Mutation = { ...Mutation, ...modules[key].Mutation };
        Subscription = { ...Subscription, ...modules[key].Subscription };
        // resolverMap = { ...resolverMap, ...modules[key].resolverMap };
    });

    return {
        Mutation,
        Query,
        // resolverMap,
        Subscription,
    };
};
