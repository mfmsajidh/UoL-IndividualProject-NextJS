import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
        scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
        congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
        aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac.
        In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae
        dui eget tellus gravida venenatis. Integer fringilla congue eros non
        fermentum. Sed dapibus pulvinar nibh tempor porta.
      </p>

      <p>
        Crase venenatis odio in lacus blandit, at suscipit mauris consequat.
        Nulla facilisi. Nullam vehicula sapien sit amet lorem vulputate, in
        imperdiet sapien accumsan. Morbi euismod nisi eu libero convallis, non
        porttitor orci varius. Nam at nunc eu augue vestibulum euismod. Nulla
        facilisi. Pellentesque gravida ligula a orci ullamcorper, in vestibulum
        lorem accumsan.
      </p>

      <p>
        Integer pretium massa ut vestibulum egestas. Nullam faucibus metus a
        ante egestas, ut pretium magna consectetur. Cras a turpis leo. In
        interdum tellus sed erat tincidunt, ut posuere ligula iaculis. Donec
        fringilla sollicitudin justo, vitae convallis augue consequat a.
        Curabitur aliquet dui et risus volutpat, id luctus enim dignissim.
        Suspendisse potenti.
      </p>
    </>
  );
}
