import {
    StepClient,
    StepDelivery,
    StepFinalInformation,
    StepPayment,
    StepProducts, StepWarehouse
} from "../components/ordersSection/orderModals/index.js";


const stepsItemsRender = (activeStep) => {
    switch (activeStep) {
        case 0:
            return <StepWarehouse/>;
        case 1:
            return <StepClient />;
        case 2:
            return <StepProducts/>;
        case 3:
            return <StepDelivery/>;
        case 4:
            return <StepPayment/>;
        case 5:
            return <StepFinalInformation/>;
        default:
            return null;
    }
};

export {
    stepsItemsRender
}