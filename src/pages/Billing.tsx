interface BillingProps {
  onUpgrade: () => void
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Try voiceover generation for free.',
    features: ['1 minute of audio', 'Basic voice library', 'MP3 downloads'],
    current: true,
  },
  {
    name: 'Creator',
    price: '$12',
    period: 'per month',
    description: 'More minutes and better tools for regular creators.',
    features: ['60 minutes of audio', 'All voices and languages', 'Priority generation', 'WAV downloads'],
  },
  {
    name: 'Studio',
    price: '$29',
    period: 'per month',
    description: 'A larger allowance for teams and high-volume work.',
    features: ['180 minutes of audio', 'Commercial usage rights', 'Fastest generation', 'Priority support'],
  },
]

export default function Billing({ onUpgrade }: BillingProps) {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <h1 className="font-display font-bold text-xl" style={{ color: '#F0F4FF', letterSpacing: '-0.04em' }}>
          Billing & Plans
        </h1>
        <p style={{ color: '#4f5a72', fontSize: '13px', marginTop: 2 }}>
          Choose the plan that fits your voiceover workflow.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-5xl">
        {plans.map(plan => (
          <div
            key={plan.name}
            className="rounded-xl p-5 flex flex-col gap-4"
            style={{
              background: '#0D0F17',
              border: plan.current ? '1px solid rgba(0,210,223,0.45)' : '1px solid #1e2a40',
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span style={{ color: '#F0F4FF', fontSize: '15px', fontWeight: 600 }}>{plan.name}</span>
                {plan.current && (
                  <span
                    className="rounded-full px-2 py-1"
                    style={{ background: 'rgba(0,210,223,0.12)', color: '#00d2df', fontSize: '10px', fontWeight: 600 }}
                  >
                    Current plan
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-3">
                <span style={{ color: '#F0F4FF', fontSize: '28px', fontWeight: 700 }}>{plan.price}</span>
                <span style={{ color: '#4f5a72', fontSize: '12px' }}>{plan.period}</span>
              </div>
              <p style={{ color: '#8892aa', fontSize: '12px', lineHeight: 1.5, marginTop: 8 }}>{plan.description}</p>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {plan.features.map(feature => (
                <div key={feature} className="flex items-center gap-2" style={{ color: '#8892aa', fontSize: '12px' }}>
                  <span style={{ color: '#00d2df', fontWeight: 700 }}>✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <button
              className={plan.current ? 'btn-ghost w-full py-2.5 rounded-xl text-sm font-medium' : 'btn-primary w-full py-2.5 rounded-xl text-sm font-semibold'}
              onClick={plan.current ? undefined : onUpgrade}
              disabled={plan.current}
            >
              {plan.current ? 'You are here' : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-5 max-w-5xl"
        style={{ background: '#111520', border: '1px solid #1e2a40' }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div style={{ color: '#F0F4FF', fontSize: '14px', fontWeight: 600 }}>Current usage</div>
            <div style={{ color: '#4f5a72', fontSize: '12px', marginTop: 4 }}>0 seconds used of 60 seconds this month</div>
          </div>
          <div className="text-right">
            <div style={{ color: '#00d2df', fontSize: '18px', fontWeight: 700 }}>100%</div>
            <div style={{ color: '#4f5a72', fontSize: '11px' }}>remaining</div>
          </div>
        </div>
        <div className="mt-3" style={{ background: '#1a1f2e', borderRadius: 4, height: 5, overflow: 'hidden' }}>
          <div style={{ width: '0%', height: '100%', background: '#00d2df', borderRadius: 4 }} />
        </div>
      </div>
    </div>
  )
}
