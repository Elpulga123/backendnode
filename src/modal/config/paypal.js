import paypal from 'paypal-rest-sdk';

const paymentConfigure =  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQnPDiWlT-s8TRyUiNPaKbDCpL-CWGfizCJgQPHsLoC2FfstPP6ILWLHLrcqdjYjByK2ExTCcLs3D2tT',
    'client_secret': 'ENNSKeDuww_qgZIvSAKmm6JGrA3g8_OLFM4piyjT9fuT9M0jYCtJkHBLWcugExI6wfzjwMPzBob0YwvU'
});

export { paymentConfigure }