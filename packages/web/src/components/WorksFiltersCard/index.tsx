import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';

import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Select, Input, DatePicker } from '~/interface/Form';
import { ISector, IService, IWorksFilters } from '~/interfaces';
import { worksStatus as status } from '~/utils/commonSelectOptions';
import { formatDatabaseDate } from '~/utils/formatString';
import { onValueInputFocus, onValueInputBlur } from '~/utils/handleInputFormat';

import { ClientSearchInput } from '../ClientSearchInput';
import { FiltersCard, FiltersCardActionButtons, FiltersCardForm } from './styles';

interface IWorksFiltersCardProps {
  onFiltersApplyClick: (data: Omit<IWorksFilters, 'page'|'limit'>) => void;
  onCreateClick: () => void;
  workPermission: number;
}

export const WorksFiltersCard: React.FC<IWorksFiltersCardProps> = ({ onCreateClick, onFiltersApplyClick, workPermission }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const formRef = useRef<FormHandles>(null);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const { data: groups } = useSWR<string[]>('/clients/groups');
  const { data: services } = useSWR<IService[]>('/services?noPagination=true');
  const { data: sectors } = useSWR<ISector[]>('/sectors?noPagination=true');
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  /* END BOOLEAN STATES */

  const onSubmit: SubmitHandler<Omit<IWorksFilters, 'page'|'limit'>> = (data) => {
    const value = data.value?.replace('.', '').replace(',', '.') || '';
    onFiltersApplyClick({ ...data, value, timeCourseStart: formatDatabaseDate(data.timeCourseStart), timeCourseEnd: formatDatabaseDate(data.timeCourseEnd) });
  };

  const handleGroups = () => {
    if(groups) {
      const array = groups.map((g) => ({ value: g, label: g }));

      return [
        { label: 'TODOS', value: '' },
        { label: 'SEM GRUPO', value: '-1' },
        ...array,
      ];
    }

    return [
      { label: 'TODOS', value: '' },
      { label: 'SEM GRUPO', value: '-1' },
    ];
  };

  const handleServiceOptions = () => {
    if(services) {
      const serviceGroups: {label: string; options: { label: string; value: string}[]}[] = [];

      services.forEach((option) => {
        if(!serviceGroups.find((gp) => gp.label === option.sector.name)) {
          serviceGroups.push({ label: option.sector.name, options: [] });
        }

        const i = serviceGroups.findIndex((gp) => gp.label === option.sector.name);
        serviceGroups[i].options.push({ label: option.name, value: option.id });
      });

      serviceGroups.forEach((group) => ({
        label: group.label,
        options: group.options.sort((a, b) => {
          if(a.label < b.label) return -1;
          if(a.label > b.label) return 1;
          return 0;
        }),
      }));

      return [{ label: 'TODOS', value: '' }, ...serviceGroups];
    }

    return [];
  };

  const handleSectorOptions = () => {
    if(sectors) {
      const array = sectors.map((sector) => ({ value: sector.id, label: sector.name }));

      return [{ label: 'TODOS', value: '' }, ...array];
    }

    return [{ label: 'TODOS', value: '' }];
  };

  return (
    <FiltersCard>
      <FiltersCardForm ref={formRef} onSubmit={onSubmit}>
        <ClientSearchInput defaultValue={{ label: 'TODOS', value: '' }} includeAll />
        <Select label="GRUPO" name="group" options={handleGroups()} defaultValue={{ label: 'TODOS', value: '' }} />
        <Select label="STATUS" name="status" options={status} isMulti defaultValue={status.filter((el) => el.value !== '4')} />

        <Input label="IDENTIFICADOR" name="identifier" />
        <Input label="VALOR" name="value" onFocus={() => onValueInputFocus(formRef)} onBlur={() => onValueInputBlur(formRef)} />
        <Select label="SERVIÇO" name="serviceId" options={handleServiceOptions()} defaultValue={{ label: 'TODOS', value: '' }} />
        <Select label="SETOR" name="sectorId" options={handleSectorOptions()} defaultValue={{ label: 'TODOS', value: '' }} />
        <div className="timeCourse">
          <DatePicker label="DE" name="timeCourseStart" maxDate={new Date(Date.now())} />
          <DatePicker label="ATÉ" name="timeCourseEnd" maxDate={new Date(Date.now())} />
        </div>
      </FiltersCardForm>

      <FiltersCardActionButtons>
        {workPermission >= 2 && (
          <Button variant="success" onClick={onCreateClick}>
            <FaPlus />&nbsp;&nbsp;&nbsp;ADICIONAR O.S.
          </Button>
        )}

        <Button variant="secondary" onClick={() => formRef.current && formRef.current.submitForm()}>
          <FaFilter />&nbsp;&nbsp;&nbsp;FILTRAR
        </Button>
      </FiltersCardActionButtons>
    </FiltersCard>
  );
};
