import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { AppButton } from '../components/common/app-button';
import { AppInput } from '../components/common/app-input';

import {
    validarCorreo,
    validarCurso,
    validarEdad,
    validarNombre,
} from '../utils/validators';

// ─── tipos de estado de cada campo ─────────────────────────────────────────

type CampoEstado = {
  valor: string;
  tocado: boolean; // true cuando el usuario escribió algo al menos una vez
};

const campoInicial: CampoEstado = { valor: '', tocado: false };

// ─── pantalla principal ─────────────────────────────────────────────────────

export default function RegistroCurso() {
  // estados de los 4 campos
  const [nombre, setNombre] = useState<CampoEstado>(campoInicial);
  const [correo, setCorreo] = useState<CampoEstado>(campoInicial);
  const [curso, setCurso]   = useState<CampoEstado>(campoInicial);
  const [edad, setEdad]     = useState<CampoEstado>(campoInicial);

  // estado del envío
  const [enviado, setEnviado] = useState(false);

  // ── validaciones ──────────────────────────────────────────────────────────
  const nombreOk = validarNombre(nombre.valor);
  const correoOk = validarCorreo(correo.valor);
  const cursoOk  = validarCurso(curso.valor);
  const edadOk   = validarEdad(edad.valor);
  const todoOk   = nombreOk && correoOk && cursoOk && edadOk;

  // muestra error sólo si el campo ya fue tocado
  const errNombre = nombre.tocado && !nombreOk;
  const errCorreo = correo.tocado && !correoOk;
  const errCurso  = curso.tocado  && !cursoOk;
  const errEdad   = edad.tocado   && !edadOk;

  // ── conteo de validaciones superadas ─────────────────────────────────────
  const validadasCount = [nombreOk, correoOk, cursoOk, edadOk].filter(Boolean).length;

  // ── handlers ─────────────────────────────────────────────────────────────
  const handleEnviar = () => {
    // marcar todos los campos como tocados para mostrar errores
    setNombre((p) => ({ ...p, tocado: true }));
    setCorreo((p) => ({ ...p, tocado: true }));
    setCurso((p)  => ({ ...p, tocado: true }));
    setEdad((p)   => ({ ...p, tocado: true }));

    if (todoOk) {
      setEnviado(true);
    }
  };

  const handleReset = () => {
    setNombre(campoInicial);
    setCorreo(campoInicial);
    setCurso(campoInicial);
    setEdad(campoInicial);
    setEnviado(false);
  };

  // ── pantalla de éxito ─────────────────────────────────────────────────────
  if (enviado) {
    return (
      <View style={styles.successScreen}>
        <View style={styles.successIconWrap}>
          <Text style={styles.successIconChar}>✓</Text>
        </View>

        <Text style={styles.successHeading}>¡Registro exitoso!</Text>
        <Text style={styles.successSub}>
          El estudiante ha sido inscrito correctamente.
        </Text>

        <View style={styles.successCard}>
          <SummaryRow label="Nombre"  value={nombre.valor} />
          <SummaryRow label="Correo"  value={correo.valor} />
          <SummaryRow label="Curso"   value={curso.valor}  />
          <SummaryRow label="Edad"    value={`${edad.valor} años`} />
        </View>

        <AppButton title="Nuevo registro" onPress={handleReset} />
      </View>
    );
  }

  // ── formulario ────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── ENCABEZADO ── */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>📚</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.overline}>OPCIÓN 5 · DAM S10</Text>
            <Text style={styles.title}>Registro de Curso</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Completa los datos del estudiante para inscribirlo al curso.
        </Text>

        {/* ── TARJETA FORMULARIO ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del estudiante</Text>
          <Text style={styles.cardSub}>Todos los campos son obligatorios.</Text>

          {/* NOMBRE */}
          <AppInput
            label="Nombre del estudiante"
            placeholder="Ej: Ana García López"
            value={nombre.valor}
            onChangeText={(v) => {
              setNombre({ valor: v, tocado: true });
              setEnviado(false);
            }}
            hasError={errNombre}
            errorMessage="El nombre debe tener al menos 3 caracteres."
          />

          {/* CORREO */}
          <AppInput
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={correo.valor}
            onChangeText={(v) => {
              setCorreo({ valor: v, tocado: true });
              setEnviado(false);
            }}
            keyboardType="email-address"
            hasError={errCorreo}
            errorMessage="El correo debe contener un @."
          />

          {/* CURSO */}
          <AppInput
            label="Curso"
            placeholder="Ej: Desarrollo de Apps Móviles"
            value={curso.valor}
            onChangeText={(v) => {
              setCurso({ valor: v, tocado: true });
              setEnviado(false);
            }}
            hasError={errCurso}
            errorMessage="El curso debe tener al menos 3 caracteres."
          />

          {/* EDAD */}
          <AppInput
            label="Edad"
            placeholder="Ej: 20"
            value={edad.valor}
            onChangeText={(v) => {
              setEdad({ valor: v, tocado: true });
              setEnviado(false);
            }}
            keyboardType="numeric"
            hasError={errEdad}
            errorMessage="La edad debe ser un número entre 15 y 80."
          />

          {/* BOTÓN ENVÍO */}
          <AppButton title="Registrar estudiante" onPress={handleEnviar} />
        </View>

        {/* ── PANEL DE VALIDACIONES ── */}
        <View style={styles.card}>
          <View style={styles.validHeader}>
            <View>
              <Text style={styles.cardTitle}>Validaciones</Text>
              <Text style={styles.cardSub}>Estado en tiempo real</Text>
            </View>
            <View style={[
              styles.counter,
              todoOk ? styles.counterDone : styles.counterPending,
            ]}>
              <Text style={[
                styles.counterText,
                todoOk ? styles.counterTextDone : styles.counterTextPending,
              ]}>
                {validadasCount}/4
              </Text>
            </View>
          </View>

          <ValidationRow
            label="Nombre obligatorio"
            desc="Al menos 3 caracteres."
            ok={nombreOk}
            touched={nombre.tocado}
          />
          <ValidationRow
            label="Correo con @"
            desc="Formato de correo válido."
            ok={correoOk}
            touched={correo.tocado}
          />
          <ValidationRow
            label="Curso obligatorio"
            desc="Al menos 3 caracteres."
            ok={cursoOk}
            touched={curso.tocado}
          />
          <ValidationRow
            label="Edad válida"
            desc="Entre 15 y 80 años."
            ok={edadOk}
            touched={edad.tocado}
          />
        </View>

        <Text style={styles.footer}>
          S10 | AP5 — Formularios y Validaciones · React Native + Expo
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── componentes auxiliares ─────────────────────────────────────────────────

type ValidationRowProps = {
  label: string;
  desc: string;
  ok: boolean;
  touched: boolean;
};

function ValidationRow({ label, desc, ok, touched }: ValidationRowProps) {
  const showOk    = ok;
  const showError = touched && !ok;

  return (
    <View style={vStyles.row}>
      <View style={[
        vStyles.dot,
        showOk    ? vStyles.dotOk    :
        showError ? vStyles.dotError :
                    vStyles.dotIdle,
      ]}>
        <Text style={[
          vStyles.dotChar,
          showOk    ? vStyles.dotCharOk    :
          showError ? vStyles.dotCharError :
                      vStyles.dotCharIdle,
        ]}>
          {showOk ? '✓' : showError ? '✕' : '○'}
        </Text>
      </View>

      <View style={vStyles.info}>
        <Text style={vStyles.label}>{label}</Text>
        <Text style={vStyles.desc}>{desc}</Text>
      </View>

      <View style={[
        vStyles.badge,
        showOk    ? vStyles.badgeOk    :
        showError ? vStyles.badgeError :
                    vStyles.badgeIdle,
      ]}>
        <Text style={[
          vStyles.badgeText,
          showOk    ? vStyles.badgeTextOk    :
          showError ? vStyles.badgeTextError :
                      vStyles.badgeTextIdle,
        ]}>
          {showOk ? 'OK' : showError ? 'Error' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );
}

type SummaryRowProps = { label: string; value: string };

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <View style={sumStyles.row}>
      <Text style={sumStyles.label}>{label}</Text>
      <Text style={sumStyles.value}>{value}</Text>
    </View>
  );
}

// ─── estilos ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },

  scroll: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 40,
  },

  // encabezado
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerBadgeText: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 1.4,
    marginBottom: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginBottom: 22,
  },

  // tarjeta genérica
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 20,
  },

  // panel validaciones — header
  validHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  counter: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterDone: {
    backgroundColor: '#DCFCE7',
  },
  counterPending: {
    backgroundColor: '#EEF2FF',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '800',
  },
  counterTextDone: {
    color: '#16A34A',
  },
  counterTextPending: {
    color: '#2563EB',
  },

  // pantalla de éxito
  successScreen: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successIconChar: {
    fontSize: 36,
    color: '#16A34A',
    fontWeight: '800',
  },
  successHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  successSub: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 28,
    textAlign: 'center',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '100%',
    marginBottom: 28,
  },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

const vStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dotOk:    { backgroundColor: '#DCFCE7' },
  dotError: { backgroundColor: '#FEE2E2' },
  dotIdle:  { backgroundColor: '#F3F4F6' },
  dotChar: {
    fontSize: 15,
    fontWeight: '800',
  },
  dotCharOk:    { color: '#16A34A' },
  dotCharError: { color: '#DC2626' },
  dotCharIdle:  { color: '#9CA3AF' },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 2,
  },
  desc: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },
  badgeOk:    { backgroundColor: '#ECFDF5' },
  badgeError: { backgroundColor: '#FEF2F2' },
  badgeIdle:  { backgroundColor: '#F3F4F6' },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextOk:    { color: '#065F46' },
  badgeTextError: { color: '#991B1B' },
  badgeTextIdle:  { color: '#6B7280' },
});

const sumStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  value: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
});
