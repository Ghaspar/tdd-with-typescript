import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund";
import { PartialRefund } from "./partial_refund";
import { RefundRule } from "./refund_rule.interface";

export class RefundRuleFactory {
    static getRefundRule(dayUntilCheckin: number): RefundRule {
        if (dayUntilCheckin > 7) {
            return new FullRefund();
        } else if (dayUntilCheckin >= 1) {
            return new PartialRefund();
        } else {
            return new NoRefund();
        }
    }
}