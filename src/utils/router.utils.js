import ReactDynamicImport from 'react-dynamic-import';
import routes from '../router/routes';

//this function imports module dynamically
export function dynamicImport(component){
    const loader = f => import(`../${f}.js`);
    return ReactDynamicImport({ name: component, loader });
}

export function route(name){
    return routes.find(route => route.name === name);
}

export function childrenRoute(parent, name){
    let children = route(parent).children;
    return children.find(route => route.name === name);
}

export function routeByPath(path){
    return routes.find(route => route.path === path);
}