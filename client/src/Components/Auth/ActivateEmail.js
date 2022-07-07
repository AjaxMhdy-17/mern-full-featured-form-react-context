import React , {useEffect} from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import { useGlobalCtx } from '../../CtxAndProvider/CtxAndProvider'

const ActivateEmail = () => {

    const params = useParams()

    const {activateEmail} = useGlobalCtx()

    useEffect(() => {
        activateEmail(params.id)
    },[params.id])

  return (
   <Layout center>
    <div className="text-5xl">
        User Activation Page 
    </div>
   </Layout>
  )
}

export default ActivateEmail