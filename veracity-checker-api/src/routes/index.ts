import veracityRouter from './veracity.router';

const routers = [
    {
        prefix: '/veracity',
        router: veracityRouter,
    },
];

export default {
    prefix: '',
    routers,
};
