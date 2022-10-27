import React from 'react'
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OnChangeValue,
  SingleValue,
  StylesConfig,
} from 'react-select'

export interface ISelectOption {
  value: string
  label: string
}

export type isMultiType = true | false

export interface ISelectProps {
  isMulti?: isMultiType
  options: ISelectOption[]
  styles?: StylesConfig<ISelectOption, isMultiType, GroupBase<ISelectOption>>
  value?: SingleValue<ISelectOption> | MultiValue<ISelectOption>
  placeholder: string
  style?: StylesConfig<ISelectOption, isMultiType>
  isClearable?: boolean
  onChange?: (
    value: OnChangeValue<ISelectOption, isMultiType>,
    action: ActionMeta<ISelectOption>,
  ) => void
  onMenuClose?: () => void
  onMenuOpen?: () => void
}

const defaultStyle: StylesConfig<ISelectOption, isMultiType> = {
  menu: (provided) => ({
    ...provided,
    background: 'white',
    color: 'black',
  }),
  control: (provided, state) => ({
    ...provided,
    background: 'white',
    height: '60px',
    color: 'white',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    padding: '0 8px',
    boxShadow: state.isFocused
      ? '0 0 0 1px var(--chakra-colors-primary-400)'
      : 'none',
  }),
  option: (provided, state) => ({
    ...provided,

    padding: 20,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  input: (base) => ({
    ...base,
    color: 'var(--chakra-colors-light-900)',
  }),
}

const SelectCommon = ({
  isMulti,
  options,
  value,
  placeholder,
  style,
  isClearable = false,
  onChange,
  onMenuClose,
  onMenuOpen,
}: ISelectProps) => {
  return (
    <Select
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      value={value}
      isClearable={isClearable}
      styles={style || defaultStyle}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={onChange}
      onMenuClose={onMenuClose}
      onMenuOpen={onMenuOpen}
    />
  )
}

export default SelectCommon
