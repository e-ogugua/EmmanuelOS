'use client'

type Props = {
  amount: number
  email: string
  name: string
  reference?: string
}

export default function FlutterwaveButton({ amount, email, name, reference }: Props) {
  const onPay = () => {
    const pubKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY
    if (!pubKey) {
      alert('Flutterwave public key is not set')
      return
    }
    // @ts-ignore - flutterwave script injects global
    const FlutterwaveCheckout = (window as any).FlutterwaveCheckout
    if (!FlutterwaveCheckout) {
      alert('Flutterwave script not loaded yet')
      return
    }
    FlutterwaveCheckout({
      public_key: pubKey,
      tx_ref: reference || `EMMDRA-${Date.now()}`,
      amount,
      currency: 'NGN',
      customer: { email, name },
      customizations: {
        title: 'Emmdra Lifestyle',
        description: 'Checkout',
      },
      callback: function (data: any) {
        console.log('Flutterwave payment callback', data)
        alert('Payment completed')
      },
      onclose: function () {},
    })
  }

  return (
    <button onClick={onPay} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded">
      Pay with Flutterwave
    </button>
  )
}
