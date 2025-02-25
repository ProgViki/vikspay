// import { ElementsType } from "@/components/dynamic-form/FormElements";
// import { AppForms } from "@/types";

import { ImageSourcePropType } from "react-native";

export type AuthState = {
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = AuthState;

export type Org = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  phone: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  supportName: string;
  supportEmail: string;
  supportPhone: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
};

export interface FileType {
  name: string;
  uri: string;
  type: string;
  size: number;
}

export type OrgVerInput = {
  email: string;
};

export type VerifyOrgInput = {
  code: string;
};

export type OnboardOrgInput = {
  name: string;
  orgName: string;
  industry: string;
  phone: string;
  password: string;
};

export type AddStaffInput = {
  email: string;
  name: string;
  country: string;
  roleIds: string[];
};

export type UpdateStaffInput = AddStaffInput & {
  id: string;
};

export type Staff = {
  id: string;
  name: string;
  country: string[];
  isActive: string;
  userId: string;
  orgId: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  isActive: string;
  userId: string;
  orgId: string;
  accountPartner: User;
  accountPartnerId: string;
  customerId: string;
};

export type Vendor = {
  spocName: string;
  companyName: string;
  email: string;
};

export type User = {
  name: string;
  id: string;
  email: string;
  orgId: string;
  verified: string;
  signature: string;
  isAdmin: string;
  isActive: boolean;
  staff: Staff;
  vendor: Vendor;
  customer: Customer;
  createdAt: string;
  roles: Role[];
};

export type AddCustomerInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type CommentDto = {
  comment: string;
  attachments: Attachments;
};

export type NewTicketInput = {
  subject: string;
  description: string;
  customerId: string;
  severity: TicketSeverity;
  categoryId: string;
};

export type EditTicketInput = NewTicketInput & {
  id: string;
};

export type TicketCategory = {
  id: string;
  name: string;
  orgId: string;
};

export type ReassignTicketInput = {
  id: string;
  assigneeId: string;
  comment: string;
};

export type EscalateTicketInput = CommentDto & {
  id: string;
  escalateToId: string;
};

export type ResolveTicketInput = CommentDto & {
  id: string;
};

export type ReopenTicketInput = CommentDto & {
  id: string;
};

export type CreateOrgUtils = {
  name: string;
};

export type UpdateOrg = {
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  supportName?: string;
  supportEmail?: string;
  supportPhone?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
};

export type OrgServiceType = {
  id: string;
  name: string;
};

export type OrgRequestType = {
  id: string;
  name: string;
};

export type OrgProjectCategory = {
  id: string;
  name: string;
};

export type OrgModeOfDelivery = {
  id: string;
  name: string;
};

export type OrgProjectPhases = {
  id: string;
  name: string;
};

export enum Progress {
  TOTAL = "TOTAL",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export type Pagination<F extends string = Progress> = {
  filterCounts: Record<F, number>;
  totalCount: number;
  totalPages: number;
  page: number;
};

export type Paginated<T> = {
  list: T[];
  pagination: Pagination;
};

export enum SurveyStatus {
  REQUESTED = "REQUESTED",
  REJECTED = "REJECTED",
  ONGOING = "ONGOING",
  REVERTED = "REVERTED",
  COMPLETED = "COMPLETED",
}

export type SubmitTicketTaskInput = {
  id: string;
  taskId: string;
  isSubtask: boolean;
};

// export type Survey = {
//   id: string;
//   surveyId: string;
//   isAssigned: boolean;
//   startDate: Date;
//   dueDate: Date;
//   assignedDate: Date;
//   completedDate: Date;
//   isSlaInWorkDays: boolean;
//   state: string;
//   region: string;
//   longitude: number;
//   latitude: number;
//   address: string;
//   customerId: string;
//   orgId: string;
//   serviceTypeId: string;
//   requestTypeId: string;
//   managerId: string;
//   createdAt: string;
//   bandwidth: string;
//   manager: User;
//   assignee: User;
//   customer: User;
//   status: SurveyStatus;
//   requestType: OrgRequestType;
//   serviceType: OrgServiceType;
//   logs: Log[];
//   dynamicSubmissions: DynamicSubmission[];
// };

export type ListSurveysQuery = {
  search?: string;
  page?: number;
  count?: number;
};

export type DynamicSubmissionInput = {
  fieldId: string;
  value: any;
};

export type NewSurveyInput = {
  customerId: string;
  address: string;
  serviceTypeId: string;
  requestTypeId: string;
  state: string;
  region: string;
  longitude: string;
  latitude: string;
  comment?: string;
  dynamicFields?: DynamicSubmissionInput[];
};

export type UpdateSurveyInput = NewSurveyInput & {
  id: string;
  surveyId: string;
};

export type AssignSurveyInput = {
  id: string;
  comment: string;
  surveyId: string;
  assigneeId: string;
  slaDays?: number;
  isWorkingDays?: boolean;
};

export type RevertSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type RejectSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type DeleteSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type CompleteSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type AddVendorInput = {
  companyName: string;
  spocName: string;
  email: string;
};

export type InventoryNotes = {
  id: string;
  comment: string;
  createdAt: string;
  userId: string;
  user: User;
  modelId: string;
};

export type Model = {
  id: string;
  name: string;
  number: string;
  manufacturer: string;
  description: string;
  category: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
  devices: Device[];
  notes: InventoryNotes[];
};

export type AddModelInput = {
  name: string;
  number: string;
  manufacturer: string;
  cost?: number;
  description: string;
  category: string;
  vendor: string;
  vendorId: string;
};

export enum DeviceStatus {
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  DELETED = "DELETED",
  FAULTY = "FAULTY",
}

export type Log = {
  deviceId?: string;
  id: string;
  action: string;
  attachments: Attachments;
  byStaff: User;
  byCustomer: User;
  toStaff: User;
  toVendor?: User;
  changedStatus: SurveyStatus;
  comment: string;
  createdAt: string;
};

export type Device = {
  id: string;
  name: string;
  manufacturer: string;
  partNumber: string;
  serialNumber: string;
  cost: number;
  location: string;
  description: string;
  dateProcured: string;
  vendor: string;
  status: DeviceStatus;
  assigneeId: string;
  assignee: User;
  modelId: string;
  orgId: string;
  model: Model;
  notes: InventoryNotes;
  attachments: Attachments;
  logs: Log[];
};

export type AddDeviceInput = {
  name: string;
  manufacturer: string;
  partNumber: string;
  serialNumber: string;
  cost: number;
  location: string;
  description: string;
  dateProcured: Date;
  modelId: string;
  attachments: string[];
};

export type UpdateModelInput = {
  id: string;
  name: string;
  number: string;
  manufacturer: string;
  description: string;
  category: string;
  vendorId: string;
};

export type UpdateDeviceInput = {
  id: string;
  name: string;
  manufacturer: string;
  serialNumber: string;
  cost: number;
  location: string;
  vendor: string;
  description: string;
  dateProcured: Date;
  modelId: string;
};

export type ReportFault = {
  id: string;
  comment: string;
  attachments: string[];
};

export type ModelNoteInput = {
  comment: string;
  modelId: string;
};

export type DeviceNoteInput = {
  comment: string;
  deviceId: string;
};

export type AssignDevice = {
  deviceIds: string[];
  assigneeId: string;
  comment: string;
};

export enum AppPermission {
  ALL = "ALL",
  // Survey
  REQUEST_SURVEY = "REQUEST_SURVEY",
  EDIT_SURVEY = "EDIT_SURVEY",
  ASSIGN_SURVEY = "ASSIGN_SURVEY",
  DELETE_SURVEY = "DELETE_SURVEY",
  COMPLETE_SURVEY = "COMPLETE_SURVEY",

  // Model
  CREATE_MODEL = "CREATE_MODEL",
  EDIT_MODEL_DETAILS = "EDIT_MODEL_DETAILS",
  SEND_MODEL_NOTES = "SEND_MODEL_NOTES",

  // Devices
  CREATE_DEVICE = "CREATE_DEVICE",
  EDIT_DEVICE_DETAILS = "EDIT_DEVICE_DETAILS",
  ASSIGN_DEVICE = "ASSIGN_DEVICE",
  REPORT_DEVICE_FAULT = "REPORT_DEVICE_FAULT",
  SEND_DEVICE_NOTES = "SEND_DEVICE_NOTES",

  // Admin
  CREATE_STAFF = "CREATE_STAFF",
  EDIT_STAFF = "EDIT_STAFF",
  DEACTIVATE_STAFF = "DEACTIVATE_STAFF",
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  EDIT_CUSTOMER = "EDIT_CUSTOMER",
  DEACTIVATE_CUSTOMER = "DEACTIVATE_CUSTOMER",
  CREATE_VENDOR = "CREATE_VENDOR",
  EDIT_VENDOR = "EDIT_VENDOR",
  DEACTIVATE_VENDOR = "DEACTIVATE_VENDOR",
}

export enum SmModules {
  USER = "USER",
  PROJECT = "PROJECT",
  INVENTORY = "INVENTORY",
}

export enum SmSubModules {
  SURVEY = "SURVEY",
  JOB_ORDER = "JOB_ORDER",
}

export const modulePermissions: Record<
  SmModules,
  { label: string; value: AppPermission }[]
> = {
  [SmModules.USER]: [
    { label: "Create Staff", value: AppPermission.CREATE_STAFF },
    { label: "Create Vendor", value: AppPermission.CREATE_VENDOR },
    { label: "Create Customer", value: AppPermission.CREATE_CUSTOMER },
    { label: "Edit Staff", value: AppPermission.EDIT_STAFF },
    { label: "Edit Vendor", value: AppPermission.EDIT_VENDOR },
    { label: "Edit Customer", value: AppPermission.EDIT_CUSTOMER },
    { label: "Deactivate Staff", value: AppPermission.DEACTIVATE_STAFF },
    { label: "Deactivate Vendor", value: AppPermission.DEACTIVATE_VENDOR },
    { label: "Deactivate Customer", value: AppPermission.DEACTIVATE_CUSTOMER },
  ],
  [SmModules.PROJECT]: [
    { label: "Request Survey", value: AppPermission.REQUEST_SURVEY },
    { label: "Edit Survey", value: AppPermission.EDIT_SURVEY },
    { label: "Assign Survey", value: AppPermission.ASSIGN_SURVEY },
    { label: "Delete Survey", value: AppPermission.DELETE_SURVEY },
    { label: "Complete Survey", value: AppPermission.COMPLETE_SURVEY },
  ],
  [SmModules.INVENTORY]: [
    { label: "Create Model", value: AppPermission.CREATE_MODEL },
    { label: "Edit Model Details", value: AppPermission.EDIT_MODEL_DETAILS },
    { label: "Send Model Notes", value: AppPermission.SEND_MODEL_NOTES },
    { label: "Create Device", value: AppPermission.CREATE_DEVICE },
    { label: "Edit Device Details", value: AppPermission.EDIT_DEVICE_DETAILS },
    { label: "Assign Device", value: AppPermission.ASSIGN_DEVICE },
    { label: "Report Device Fault", value: AppPermission.REPORT_DEVICE_FAULT },
    { label: "Send Device Notes", value: AppPermission.SEND_DEVICE_NOTES },
  ],
};

export enum ProjectStage {
  // Project
  NOT_STARTED = "NOT_STARTED",
  LEAD_ASSIGNED = "LEAD_ASSIGNED",
  IMPLEMENTATION = "IMPLEMENTATION",

  // Design
  DESIGN_REQUESTED = "DESIGN_REQUESTED",
  DESIGN_ASSIGNED = "DESIGN_ASSIGNED",
  DESIGN_SUBMITTED = "DESIGN_SUBMITTED",
  DESIGN_REVERTED = "DESIGN_REVERTED",
  DESIGN_REWORK = "DESIGN_REWORK",

  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",

  AS_BUILT = "AS_BUILT",
  AS_BUILT_REVIEW = "AS_BUILT_REVIEW",
  AS_BUILT_REJECTED = "AS_BUILT_REJECTED",
  ACCEPTANCE_REVIEW = "ACCEPTANCE_REVIEW",
  ACCEPTANCE_REJECTED = "ACCEPTANCE_REJECTED",

  PRE_ATP = "PRE_ATP",
  FIELD_ATP = "FIELD_ATP",
  PRE_ATP_FAILED = "PRE_ATP_FAILED",
  FIELD_ATP_FAILED = "FIELD_ATP_FAILED",

  PROJECT_SIGNOFF = "PROJECT_SIGNOFF",
  CUSTOMER_SIGNOFF = "CUSTOMER_SIGNOFF",
  SIGNOFF_SUSPENDED = "SIGNOFF_SUSPENDED",

  // End Stage
  CLOSED = "CLOSED",
}

export type VendorUpdate = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  vendorId: string;
  comment: string;
  phase: string;
  attachmentsId: string;
  attachments: Attachments;
};

export type ProjectDesign = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  designerId: string;
  comment: string;
  connectingSiteId: string;
  connectingSiteName: string;
  customerId: string;
  frequency: string;
  lanIp: string;
  latitude: number;
  longitude: number;
  loopbackIp: string;
  serviceVlan: string;
  terminalEquipmentType: string;
  txMedium: string;
  upeCtnInterface: string;
  wanIp: string;
  attachmentsId: string;
  attachments: Attachments;
  designer: User;
};

export type ProjectAsBuilt = ProjectDesign & {
  cpeType: string;
  ceDevice: string;
  accessPortNode: string;
  antenna: string;
  deviceOem: string;
  indoor: string;
  polarization: string;
  radioVersion: string;
  serviceProvider: string;
  lga: string;
};

export type Project = {
  surveyId: any;
  id: string;
  jobId: string;
  designStage: ProjectStage;
  projectStage: ProjectStage;
  startDate: string;
  designDueDate: Date;
  designAssignedDate: Date;
  designCompletedDate: Date;
  projectDueDate: Date;
  billingDate: Date;
  vendorAssignedDate: Date;
  projectCompletedDate: Date;
  isDesignSlaInWorkDays: boolean;
  isProjectSlaInWorkDays: boolean;
  acceptanceStage: ProjectStage;
  unapprovedStage: ProjectStage;
  isAssigned: boolean;
  isVendorAssigned: boolean;
  isDesignUploaded: boolean;
  phase: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  address: string;
  bandwidth: string;
  nrr: number;
  mrr: number;
  state: string;
  region: string;
  longitude: number;
  latitude: number;
  modeOfDeliveryId: string;
  categoryId: string;
  requestTypeId: string;
  serviceTypeId: string;
  requesterId: string;
  customerId: string;
  managerId: string;
  leadId: string;
  orgId: string;
  manager: User;
  customer: User;
  lead: User;
  assignee: User;
  vendor: User;
  requestType: OrgRequestType;
  serviceType: OrgServiceType;
  category: OrgProjectCategory;
  modeOfDelivery: OrgModeOfDelivery;
  logs: Log[];
  vendorUpdates: VendorUpdate[];
  design: ProjectDesign;
  asBuilt: ProjectAsBuilt;
};

export type NewProjectInput = {
  customerId: string;
  managerId: string;
  surveyId: string;
  leadId: string;
  serviceTypeId: string;
  requestTypeId: string;
  categoryId: string;
  modeOfDeliveryId: string;
  address: string;
  bandwidth: string;
  state: string;
  region: string;
  longitude: number;
  latitude: number;
  mrr: number;
  nrr: number;
  description: string;
  attachments?: Attachments;
  comment?: string;
};

export type AssignProjectInput = CommentDto & {
  id: string;
  assigneeId: string;
  slaDays?: number;
  isWorkingDays?: boolean;
};

export type CommentProjectInput = CommentDto & {
  id: string;
};

export type EditProjectInput = NewProjectInput & {
  id: string;
};

export type ReassignProjectLeadInput = CommentDto & {
  id: string;
  leadId: string;
};

export type AssignProjectVendorInput = CommentDto & {
  id: string;
  vendorId: string;
  slaDays?: number;
  isWorkingDays?: boolean;
};

export type ProjectVendorUpdate = CommentDto & {
  id: string;
  phase: string;
  vendorId: string;
};

export type ProjectUpdatePhase = CommentDto & {
  id: string;
  phase: string;
};

// export type DynamicFieldInput = {
//   formType: AppForms;
//   module: SmModules;
//   type: ElementsType;
//   label: string;
//   helperText?: string;
//   placeholder?: string;
//   required?: boolean;
//   options?: any[];
// };

// export interface DynamicForm {
//   id: string;
//   fieldId: string;
//   formType: AppForms;
//   module: SmModules;
//   type: ElementsType;
//   label: string;
//   helperText: string;
//   placeholder: string;
//   required: boolean;
//   options: any;
//   orgId: string;
// }

// type DynamicSubmission = {
//   id: string;
//   data: string;
//   surveyId: string;
//   formFieldId: string;
//   formField: DynamicForm;
// };

export interface ListProjectsQuery {
  atp?: boolean;
  customer?: boolean;
}

export interface SubmitDesignInput extends CommentDto {
  id: string;
  txMedium: string;
  frequency: string;
  terminalEquipmentType: string;
  loopbackIp: string;
  wanIp: string;
  lanIp: string;
  upeCtnInterface: string;
  serviceVlan: string;
  customerId: string;
  latitude: number;
  longitude: number;
  connectingSiteId: string;
  connectingSiteName: string;
}

export interface SubmitAsBuiltInput extends SubmitDesignInput {
  cpeType: string;
  ceDevice: string;
  accessPortNode: string;
  antenna: string;
  deviceOem: string;
  indoor: string;
  polarization: string;
  radioVersion: string;
  serviceProvider: string;
  lga: string;
}

export interface AsBuiltAction extends CommentDto {
  id: string;
}

export interface SkipEatpInput extends CommentDto {
  id: string;
}

export interface AcceptanceAction extends CommentDto {
  id: string;
}

export interface AtpAction extends CommentDto {
  id: string;
}

export enum TicketSeverity {
  LOW = "LOW",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  CRITICAL = "CRITICAL",
}

export enum TicketStatus {
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
  ASSIGNED = "ASSIGNED",
  ESCALATED = "ESCALATED",
  COMPLETED = "COMPLETED",
}

export interface Ticket {
  jobId: string;
  id: string;
  ticketId: string;
  subject: string;
  title: string;
  description: string;
  attachments: Attachments;
  createdAt: Date;
  openedDate: Date;
  closedDate: Date;
  categoryId: Date;
  status: TicketStatus;
  severity: TicketSeverity;
  requesterId: string;
  assigneeId: string;
  customerId: string;
  orgId: string;
  assignee: User;
  customer: User;
  category: TicketCategory;
  requester: User;
  logs: Log[];
  tasks: Task[];
}

export interface Task {
  id: string;
  status?: string;
  title: string;
  description: string;
  comment: string;
  createdAt?: Date;
  subtasks?: SubTask[];
}

export interface FTTHsubtasks {
  id: string;
  title: string;
  status: HomeConnStatus;
  updatedAt: string;
  comment?: string;
  attachments?:
    | { url: ImageSourcePropType | undefined; name: string; size: string }[]
    | null;
}
[];

export interface FTTHTasks {
  id: string;
  title: string;
  status?: HomeConnStatus;
  updatedAt?: string;
  subtasks?: FTTHsubtasks[];
  order?: number;
  comment?: string;
  attachments?:
    | { url: ImageSourcePropType | undefined; name: string; size: string }[]
    | null;
}
export interface SubTask {
  updatedAt?: string;
  id: string;
  title: string;
  createdAt?: string;
  status: TicketStatus;
}

export interface TicketComment {
  id: string;
  user: User;
  createdAt: Date;
  comment: string;
  ticketId: string;
  userId: string;
  attachmentsId: string;
  attachments: Attachments;
}

export interface CreateTicketComment extends CommentDto {
  id: string;
}

export interface ProjectSignoffInput {
  id: string;
  signature?: string;
  billingDate?: string;
  contactEmail?: string;
}

export interface CustomerSignoffInput extends CommentDto {
  id: string;
  signature?: string;
}

export interface CreateRoleInput {
  name: string;
  module: SmModules;
  description: string;
  assigneeIds: string[];
  permissions: AppPermission[];
  reportsToId?: string;
}

export interface EditRoleInput {
  id: string;
  name: string;
  description: string;
  assigneeIds: string[];
  permissions: AppPermission[];
  reportsToId?: string;
}

export interface AssignRoleInput {
  id: string;
  assigneeIds: string[];
}

export interface ListRolesQuery {
  module?: SmModules;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  module: SmModules;
  permissions: AppPermission[];
  reportsToId: string;
  orgId: string;
  assignee: User[];
  reportsTo: User;
}

export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "CANCELLED";

export type ListSubscriptionsQuery = {
  status?: SubscriptionStatus;
  search?: string;
  page?: number;
  count?: number;
};

export type Subscription = {
  id: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  module: SmModules;
};

export type ServiceTiers = {
  id: string;
  label: string;
  limit: number;
  serviceId: string;
  features: string[];
  description: string;
  monthlyAmount: number;
  yearlyAmount: number;
};

// export enum DiscountType {
//   FIXED,
//   PERCENTAGE
// }

// export type AddServicesInput = {
//   plans: any;
//   serviceName: any;
//   billingCycle: string | null | undefined;
//   name: string;
//   description: string;
//   cycle: BillingCycle;
//   tiers: {
//     name: string;
//     description: string;
//     amount: number;
//     features: string[];
//    }[]
//   discount?: number;
//   discountType?: DiscountType;
// }
//services endpoints

export enum BillingCycle {
  MONTHLY,
  YEARLY,
}

export enum DiscountType {
  FIXED,
  PERCENTAGE,
}

export type AddServicesInput = {
  plans: any;
  serviceName: any;
  billingCycle: string | null | undefined;
  name: string;
  description: string;
  cycle: BillingCycle;
  tiers: {
    name: string;
    description: string;
    amount: number;
    features: string[];
  }[];
  discount?: number;
  discountType?: DiscountType;
};

export enum HomeConnStatus {
  ASSIGNED = "ASSIGNED",
  ESCALATED = "ESCALATED",
  RESOLVED = "RESOLVED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
}

export type HomeConn = {
  id: string;
  status: HomeConnStatus;
  jobId: string;
  fn: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  estateName: string;
  scheduledDate: Date;
  dueDate: Date;
  isSlaInWorkDays: boolean;
  createdAt: string;
  isVendor: boolean;
  requesterId: string;
  assigneeId: string;
  orgId: string;
  tasks: FTTHTasks[];
  assignee: User;
};

export type Upload = {
  id: string;
  name: string;
  key: string;
  mime: string;
  order: number;
  size: number;
  createdAt: number;
  fileContent?: {
    data: Buffer;
  };
};

type Attachments = {
  id: string;
  uploads: Upload[];
};

export type SubmitTaskInput = {
  id: string;
  taskId: string;
  isSubtask: boolean;
  comment?: string;
  attachments?: Attachments;
};
