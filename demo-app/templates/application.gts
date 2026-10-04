import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { pageTitle } from 'ember-page-title';
import { RRuleGenerator } from '#src/index.ts';
import {
  DateInput,
  NumberInput,
  Select,
  WeekDays,
} from '../components/views.gts';

export default class Application extends Component {
  @tracked rule = 'RRULE:FREQ=DAILY;INTERVAL=1';

  config = {
    supportedTimezones: () => ['UTC', 'America/Monterrey', 'Europe/Madrid'],
  };

  changeRule = (rule: string) => {
    this.rule = rule;
  };

  changeRuleFromInput = (e: Event) => {
    this.rule = (e.target as HTMLTextAreaElement).value;
  };

  <template>
    {{pageTitle "ember-rrule-generator"}}

    <main>
      <h1>ember-rrule-generator</h1>

      <label class="field">
        <span>RRule</span>
        <textarea
          rows="3"
          value={{this.rule}}
          {{on "input" this.changeRuleFromInput}}
        ></textarea>
      </label>

      <RRuleGenerator
        @onChange={{this.changeRule}}
        @value={{this.rule}}
        @config={{this.config}}
        as |Generator|
      >
        <Generator.Timezone as |Timezone|>
          <Timezone.Select @view={{component Select label="Timezone"}} />
        </Generator.Timezone>
        <Generator.Start as |Start|>
          <Start.OnDate @view={{component DateInput label="Start"}} />
        </Generator.Start>
        <Generator.Repeat as |Repeat|>
          <Repeat.Select @view={{component Select label="Repeat"}} />
          {{#if Repeat.isYearlyActive}}
            <Repeat.Yearly as |Yearly|>
              <Yearly.Interval
                @view={{component NumberInput label="Every (years)"}}
              />
              <Yearly.Select @view={{Select}} />
              {{#if Yearly.isOnActive}}
                <Yearly.On as |On|>
                  <On.Month @view={{Select}} />
                  <On.Day @view={{Select}} />
                </Yearly.On>
              {{/if}}
              {{#if Yearly.isOnTheActive}}
                <Yearly.OnThe as |OnThe|>
                  <OnThe.Which @view={{Select}} />
                  <OnThe.Day @view={{Select}} />
                  <OnThe.Month @view={{Select}} />
                </Yearly.OnThe>
              {{/if}}
            </Repeat.Yearly>
          {{/if}}
          {{#if Repeat.isMonthlyActive}}
            <Repeat.Monthly as |Monthly|>
              <Monthly.Interval
                @view={{component NumberInput label="Every (months)"}}
              />
              <Monthly.Select @view={{Select}} />
              {{#if Monthly.isOnActive}}
                <Monthly.On as |On|>
                  <On.Day @view={{Select}} />
                </Monthly.On>
              {{/if}}
              {{#if Monthly.isOnTheActive}}
                <Monthly.OnThe as |OnThe|>
                  <OnThe.Which @view={{Select}} />
                  <OnThe.Day @view={{Select}} />
                </Monthly.OnThe>
              {{/if}}
            </Repeat.Monthly>
          {{/if}}
          {{#if Repeat.isWeeklyActive}}
            <Repeat.Weekly as |Weekly|>
              <Weekly.Interval
                @view={{component NumberInput label="Every (weeks)"}}
              />
              <Weekly.Days @view={{WeekDays}} />
            </Repeat.Weekly>
          {{/if}}
          {{#if Repeat.isDailyActive}}
            <Repeat.Daily as |Daily|>
              <Daily.Interval
                @view={{component NumberInput label="Every (days)"}}
              />
            </Repeat.Daily>
          {{/if}}
          {{#if Repeat.isHourlyActive}}
            <Repeat.Hourly as |Hourly|>
              <Hourly.Interval
                @view={{component NumberInput label="Every (hours)"}}
              />
            </Repeat.Hourly>
          {{/if}}
          {{#if Repeat.isMinutelyActive}}
            <Repeat.Minutely as |Minutely|>
              <Minutely.Interval
                @view={{component NumberInput label="Every (minutes)"}}
              />
            </Repeat.Minutely>
          {{/if}}
        </Generator.Repeat>
        <Generator.End as |End|>
          <End.Select @view={{component Select label="End"}} />
          {{#if End.isOnDateActive}}
            <End.OnDate @view={{component DateInput label="On"}} />
          {{else if End.isAfterActive}}
            <End.After @view={{component NumberInput label="Executions"}} />
          {{/if}}
        </Generator.End>
      </RRuleGenerator>
    </main>
  </template>
}
