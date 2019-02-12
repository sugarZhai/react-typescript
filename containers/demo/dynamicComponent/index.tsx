import dynamic from 'next/dynamic'
const LoadingSlot = () => (<p>...</p>)
const DynamicComponentWithCustomLoading = dynamic(
  import('./components/Hello2').then((re) => re.default),
  {
    ssr: false,
    loading: LoadingSlot,
  },
)

export default function Test() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>Dynamic PAGE is here!</p>
    </div>
  )
}
