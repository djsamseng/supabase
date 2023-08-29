import { AuthError } from '@supabase/gotrue-js'
import { Factor } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'
import { useMfaChallengeAndVerifyMutation } from 'data/profile/mfa-challenge-and-verify-mutation'
import { useMfaListFactorsQuery } from 'data/profile/mfa-list-factors-query'
import { useStore } from 'hooks'
import { usePushNext } from 'hooks/misc/useAutoAuthRedirect'
import { useEffect, useState } from 'react'
import { Button, Form, IconLock, Input } from 'ui'
import { object, string } from 'yup'

const signInSchema = object({
  code: string().required('MFA Code is required'),
})

const SignInMfaForm = () => {
  const { ui } = useStore()
  const pushNext = usePushNext()
  const queryClient = useQueryClient()
  const { data: factors, isSuccess: factorsSuccess } = useMfaListFactorsQuery()
  const { mutateAsync: mfaChallengeAndVerify, isLoading } = useMfaChallengeAndVerifyMutation()
  const [selectedFactor, setSelectedFactor] = useState<Factor | null>(null)

  // if the user wanders into this page and he has no MFA setup, send the user to the next screen
  if (factorsSuccess && factors.totp.length === 0) {
    queryClient.resetQueries().then(() => pushNext())
  }

  useEffect(() => {
    if (factorsSuccess) {
      setSelectedFactor(factors.totp[0])
    }
  }, [factors?.totp, factorsSuccess])

  const onSignIn = async ({ code }: { code: string }) => {
    const toastId = ui.setNotification({
      category: 'loading',
      message: `Signing in...`,
    })
    if (selectedFactor) {
      await mfaChallengeAndVerify(
        { factorId: selectedFactor.id, code },
        {
          onSuccess: async () => {
            ui.setNotification({
              id: toastId,
              category: 'success',
              message: `Signed in successfully!`,
            })

            await queryClient.resetQueries()

            await pushNext()
          },
          onError: (error) => {
            ui.setNotification({
              id: toastId,
              category: 'error',
              message: (error as AuthError).message,
            })
          },
        }
      )
    }
  }

  return (
    <Form
      validateOnBlur
      id="sign-in-mfa-form"
      initialValues={{ code: '' }}
      validationSchema={signInSchema}
      onSubmit={onSignIn}
    >
      {() => (
        <div className="flex flex-col gap-4">
          <Input
            id="code"
            name="code"
            type="text"
            icon={<IconLock />}
            placeholder="XXXXXX"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
            autoCapitalize="none"
            autoCorrect="off"
            label={
              selectedFactor && factors?.totp.length === 2
                ? `Code generated by ${selectedFactor.friendly_name}`
                : null
            }
          />

          <Button
            block
            form="sign-in-mfa-form"
            htmlType="submit"
            size="large"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Verifying' : 'Verify'}
          </Button>
          {factors?.totp.length === 2 && (
            <div className="text-sm flex flex-col items-center w-full gap-1">
              <div>
                <span className="text-scale-900">Having problems?</span>{' '}
                <a
                  className="text-white hover:border-b border-white"
                  href="#"
                  onClick={() =>
                    setSelectedFactor(factors.totp.find((f) => f.id !== selectedFactor?.id)!)
                  }
                >{`Authenticate using ${
                  factors.totp.find((f) => f.id !== selectedFactor?.id)?.friendly_name
                }?`}</a>
              </div>
            </div>
          )}
        </div>
      )}
    </Form>
  )
}

export default SignInMfaForm
