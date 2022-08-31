import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments, { goToBillingPortal } from '../lib/stripe'
import Membership from './Components/MemberShip'

interface Props {
  products: Product[]
}

function Account({ products }: Props) {
  console.log(products)
  const { user, logout, loading } = useAuth()
  const subscription = useSubscription(user)
  const [isBillingLoading, setBillingLoading] = useState(false)

  if (loading) return null

  console.log(subscription)
  return (
    <div className='bg-white mt-10 lg:h-[140vh]' >
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/pngwing.com.png" />
      </Head>
      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="/Netflix_2015_logo (1).svg"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10 ">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl text-black">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="/membersince.svg" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium text-black ">
              
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name 
              
              
            }

            <svg viewBox="0 0 4770 960" className="quality-icon w-30 h-7"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M724,595 C724,642 714,672 694,684 C673,696 622,702 538,702 C460,702 412,696 393,684 C373,672 363,642 363,595 L363,247 L291,247 L291,612 C291,665 309,701 344,721 C379,739 445,749 543,749 C647,749 715,739 748,720 C780,700 796,659 796,595 L796,247 L724,247 L724,595 Z M1013,691 L1013,247 L941,247 L941,744 L1341,744 L1341,691 L1013,691 Z M1858,299 L1858,247 L1372,247 L1372,299 L1580,299 L1580,744 L1652,744 L1652,299 L1858,299 Z M2428,617 C2428,556 2394,525 2327,520 L2327,519 C2369,515 2398,503 2414,484 C2429,467 2437,434 2437,388 C2437,336 2422,300 2394,278 C2366,257 2318,247 2249,247 L1946,247 L1946,744 L2018,744 L2018,542 L2259,542 C2323,542 2356,571 2356,629 L2356,744 L2428,744 L2428,617 Z M2337,475 C2318,489 2281,495 2225,495 L2018,495 L2018,295 L2250,295 C2299,295 2331,301 2345,314 C2360,328 2368,358 2368,402 C2368,438 2358,462 2337,475 Z M3008,744 L3083,744 L2844,247 L2743,247 L2510,744 L2586,744 L2635,639 L2958,639 L3008,744 Z M2937,596 L2656,596 L2795,292 L2937,596 Z M3730,549 L3428,549 L3428,746 L3330,746 L3330,247 L3428,247 L3428,443 L3730,443 L3730,247 L3829,247 L3829,746 L3730,746 L3730,549 Z M4226,247 C4301,247 4356,260 4389,286 C4417,306 4438,335 4454,372 C4470,408 4478,449 4478,493 C4478,591 4449,661 4389,706 C4356,732 4301,746 4226,746 L3980,746 L3980,247 L4226,247 Z M4216,639 C4346,639 4373,562 4373,493 C4373,427 4359,351 4216,351 L4078,351 L4078,639 L4216,639 Z" fill="currentColor"></path><path d="M4638.00019,0 C4711.00009,0 4770,59 4770,132 L4770,827 C4770,868.423884 4751.51202,905.147426 4722.42954,929.452533 C4699.55882,948.56629 4670.13605,960 4638.00019,960 L133.999803,960 C58.9999134,960 0,901 0,827 L0,132 C0,59 58.9999134,0 133.999803,0 L4638.00019,0 Z M133.999803,80 C103.999847,80 79.9998826,103 79.9998826,132 L79.9998826,827 C79.9998826,857 103.999847,880 133.999803,880 L4638.00019,880 C4667.00015,880 4690.00012,856 4690.00012,827 L4690.00012,132 C4690.00012,103 4667.00015,80 4638.00019,80 L133.999803,80 Z" fill="currentColor"></path></g></svg>
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right"
            onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}