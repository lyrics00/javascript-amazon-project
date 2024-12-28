class DeliveryOption {
    id;
    deliveryDays;
    priceCents;

    constructor(deliveryOptionDetails) {
        this.id = deliveryOptionDetails.id;
        this.deliveryDays = deliveryOptionDetails.deliveryDays;
        this.priceCents = deliveryOptionDetails.priceCents;
    }
}

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}].map((deliveryOption) => {
    return new DeliveryOption(deliveryOption);
});

export function getDeliveryOption(deliveryOptionId) {
    const matchingDeliveryOption = deliveryOptions.find((deliveryOption) => deliveryOptionId === deliveryOption.id);
    return matchingDeliveryOption || deliveryOptions[0];
  } 

