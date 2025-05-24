'use client'

import { Fieldset } from '@chakra-ui/react'

export function FieldsetPage() {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <div>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </div>

      <Fieldset.Content>
        <div>
          <label>
            Name
            <input name="name" />
          </label>
        </div>

        <div>
          <label>
            Email address
            <input name="email" type="email" />
          </label>
        </div>

        <div>
          <label>
            Country
            <select name="country">
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>United States</option>
            </select>
          </label>
        </div>
      </Fieldset.Content>

      <button type="submit" style={{ alignSelf: 'flex-start' }}>
        Submit
      </button>
    </Fieldset.Root>
  )
}
