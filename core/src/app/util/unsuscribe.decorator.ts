/**
 * Decorador para desuscrirbirnos un Observable
 *  Credits
 *  http://blog.2muchcoffee.com/how-to-avoid-multiple-subscription-in-angular-2-component/
 *  Pediente de refactor y mejora, para controlar que siempre le llega un Suscriber
 *  */
export function DestroySubscribers() {
    return function (target: any) {
        // decorating the function ngOnDestroy
        target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);

        // decorator function
        function ngOnDestroyDecorator(f) {
            return function () {
                // saving the result of ngOnDestroy performance to the variable superData 
                let superData = f ? f.apply(this, arguments) : null;
                // unsubscribing
                console.log(this.subscribers);
                for (let subscriberKey in this.subscribers) {
                    let subscriber = this.subscribers[subscriberKey];
                    subscriber.unsubscribe();
                }

                // returning the result of ngOnDestroy performance
                return superData;
            };
        }

        // returning the decorated class
        return target;
    };

}
