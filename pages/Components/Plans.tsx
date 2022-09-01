import { CheckIcon } from '@heroicons/react/24/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { loadCheckout } from '../../lib/stripe'
import Loader from './Loader'
import Table from './Table'

interface Props {
  products: Product[]
}

function Plans({ products }: Props) {
  const { logout, user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
  const [isBillingLoading, setBillingLoading] = useState(false)


  const subscribeToPlan = () => {
    if (!user) return

    loadCheckout(selectedPlan?.prices[0].id!)
    setBillingLoading(true)
  }

  return (
    <div className='bg-[#ffffff]'>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/pngwing.com.png" />
      </Head>
      <header className="border-b border-white/10 bg-[#000000]">
        <Link href="/">
          <img
            src="Netflix_2015_logo (1).svg"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline text-[#ffffff]"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
      <hr className='border-white/10 bg-[#000000]'/>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10 ">
        <h1 className="mb-3 text-3xl font-medium text-[#000000]">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg text-[#000000]">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg text-[#000000]">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg text-[#000000]">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5 ">
            {products.map((product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />
            <p className='text-gray-400 text-xs mb-5'>
                HD ( 720p ) , Full HD ( 1080p ) , Ultra HD ( 4K ) and HDR availability subject to your internet service and device capabilities . Not all <br/>
                content is available in all resolutions . See our <span className='text-[#196ED8]'>Terms of Use</span>  for more details . <br/><br/>
                Only people who live with you may use your account . Watch on 4 different devices at the same time with Premium , 2 with Standard <br/>
                and 1 with Basic .
            </p>
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px]  ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300 " />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans