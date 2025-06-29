import {
    StepClient,
    StepDelivery,
    StepFinalInformation,
    StepPayment,
    StepProducts
} from "../components/ordersSection/orderModals/index.js";


const stepsItemsRender = (activeStep) => {
    switch (activeStep) {
        case 0:
            return <StepClient />;
        case 1:
            return <StepProducts/>;
        case 2:
            return <StepDelivery/>;
        case 3:
            return <StepPayment/>;
        case 4:
            return <StepFinalInformation/>;
        default:
            return null;
    }
};

export {
    stepsItemsRender
}