import './App.css'

function App() {
  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='col-span-5 bg-red-300'>Child 1</div>
        <div className='col-span-5 bg-blue-300'>Child 2</div>
        <div className='col-span-2 bg-green-300'>Child 3</div>
      </div>
    </>
  )
}

export default App
